/**
 * Pure unit tests for linked-PR helpers (shipped module).
 * Run: npx tsx --test src/5_shared/utils/githubLinkedPulls.spec.ts
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    buildLinkedPullsSearchQuery,
    countOpenLinkedPulls,
    filterLinkedPullItems,
    referencesIssueNumber,
    type GhSearchItem,
    type LinkedPullRequest,
} from './githubLinkedPulls';

const pr = (
    partial: Partial<GhSearchItem> & Pick<GhSearchItem, 'number' | 'html_url'>,
): GhSearchItem => ({
    title: '',
    state: 'open',
    pull_request: { url: 'x' },
    ...partial,
});

describe('referencesIssueNumber', () => {
    it('matches #N with word boundaries', () => {
        assert.equal(referencesIssueNumber('closes #10', 10), true);
        assert.equal(referencesIssueNumber('fix(#10)', 10), true);
        assert.equal(referencesIssueNumber('#10 is done', 10), true);
        assert.equal(referencesIssueNumber('see issue #10.', 10), true);
    });

    it('rejects longer numbers and non-hash forms', () => {
        assert.equal(referencesIssueNumber('closes #100', 10), false);
        assert.equal(referencesIssueNumber('issue 10', 10), false);
        assert.equal(referencesIssueNumber('GH-10', 10), false);
        assert.equal(referencesIssueNumber('path/10', 10), false);
        assert.equal(referencesIssueNumber('', 10), false);
        assert.equal(referencesIssueNumber(null, 10), false);
        assert.equal(referencesIssueNumber('#10', 0), false);
    });
});

describe('buildLinkedPullsSearchQuery', () => {
    it('scopes repo, PR type, and quoted issue ref', () => {
        assert.equal(
            buildLinkedPullsSearchQuery('acme/app', 76, false),
            'repo:acme/app is:pr "#76" in:title,body',
        );
        assert.equal(
            buildLinkedPullsSearchQuery('acme/app', 76, true),
            'repo:acme/app is:pr is:open "#76" in:title,body',
        );
    });
});

describe('filterLinkedPullItems', () => {
    it('maps open PRs and sorts open before closed', () => {
        const items: GhSearchItem[] = [
            pr({
                number: 1,
                title: 'fix stuff #10',
                html_url: 'https://github.com/o/r/pull/1',
                state: 'closed',
                user: { login: 'alice' },
            }),
            pr({
                number: 2,
                title: 'feat: closes #10',
                html_url: 'https://github.com/o/r/pull/2',
                state: 'open',
                draft: true,
                user: { login: 'bob' },
            }),
        ];
        const result = filterLinkedPullItems(items, 10);
        assert.equal(result.length, 2);
        assert.equal(result[0].number, 2);
        assert.equal(result[0].state, 'open');
        assert.equal(result[0].draft, true);
        assert.equal(result[0].user_login, 'bob');
        assert.equal(result[1].state, 'closed');
        assert.equal(result[1].user_login, 'alice');
    });

    it('skips non-PR issues', () => {
        const items: GhSearchItem[] = [
            {
                number: 3,
                title: 'not a pr #3',
                html_url: 'https://github.com/o/r/issues/3',
                state: 'open',
                user: { login: 'x' },
            },
        ];
        assert.equal(filterLinkedPullItems(items, 3).length, 0);
    });

    it('accepts PRs identified by /pull/ URL without pull_request field', () => {
        const items: GhSearchItem[] = [
            {
                number: 9,
                title: 'linked #1',
                html_url: 'https://github.com/o/r/pull/9',
                state: 'open',
                user: { login: 'c' },
            },
        ];
        const result = filterLinkedPullItems(items, 1);
        assert.equal(result.length, 1);
        assert.equal(result[0].number, 9);
    });

    it('sorts same-state by higher number first', () => {
        const items: GhSearchItem[] = [
            pr({
                number: 4,
                title: 'a #1',
                html_url: 'https://github.com/o/r/pull/4',
            }),
            pr({
                number: 7,
                title: 'b #1',
                html_url: 'https://github.com/o/r/pull/7',
            }),
        ];
        const result = filterLinkedPullItems(items, 1);
        assert.deepEqual(
            result.map((p) => p.number),
            [7, 4],
        );
    });

    it('defaults missing user login to unknown', () => {
        const items: GhSearchItem[] = [
            pr({
                number: 5,
                title: 'solo #5',
                html_url: 'https://github.com/o/r/pull/5',
            }),
        ];
        assert.equal(filterLinkedPullItems(items, 5)[0].user_login, 'unknown');
    });

    it('drops false positives that only share bare digits', () => {
        const items: GhSearchItem[] = [
            pr({
                number: 99,
                title: 'bump deps to 10.0.0',
                body: 'no issue link here',
                html_url: 'https://github.com/o/r/pull/99',
            }),
            pr({
                number: 100,
                title: 'closes #100',
                html_url: 'https://github.com/o/r/pull/100',
            }),
        ];
        assert.equal(filterLinkedPullItems(items, 10).length, 0);
    });

    it('keeps PRs that mention #N only in body', () => {
        const items: GhSearchItem[] = [
            pr({
                number: 8,
                title: 'docs: claim guide',
                body: 'Closes #76\n\nMore detail.',
                html_url: 'https://github.com/o/r/pull/8',
            }),
        ];
        const result = filterLinkedPullItems(items, 76);
        assert.equal(result.length, 1);
        assert.equal(result[0].number, 8);
    });

    it('dedupes by PR number', () => {
        const items: GhSearchItem[] = [
            pr({
                number: 3,
                title: 'a #1',
                html_url: 'https://github.com/o/r/pull/3',
            }),
            pr({
                number: 3,
                title: 'a #1 again',
                html_url: 'https://github.com/o/r/pull/3',
            }),
        ];
        assert.equal(filterLinkedPullItems(items, 1).length, 1);
    });

    it('returns empty for invalid issue numbers or non-arrays', () => {
        assert.deepEqual(filterLinkedPullItems([pr({ number: 1, title: '#1', html_url: 'u' })], 0), []);
        assert.deepEqual(filterLinkedPullItems(null as unknown as GhSearchItem[], 1), []);
    });
});

describe('countOpenLinkedPulls', () => {
    it('counts only open state', () => {
        const pulls = filterLinkedPullItems(
            [
                pr({
                    number: 1,
                    title: 'a #1',
                    html_url: 'https://github.com/o/r/pull/1',
                    state: 'closed',
                }),
                pr({
                    number: 2,
                    title: 'b #1',
                    html_url: 'https://github.com/o/r/pull/2',
                    state: 'open',
                }),
            ],
            1,
        );
        assert.equal(countOpenLinkedPulls(pulls), 1);
    });

    it('returns 0 for empty or invalid input', () => {
        assert.equal(countOpenLinkedPulls([]), 0);
        assert.equal(countOpenLinkedPulls(null as unknown as LinkedPullRequest[]), 0);
    });
});
