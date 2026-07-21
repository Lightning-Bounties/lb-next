/**
 * Resolve GitHub pull requests that reference a bounty issue.
 * Used to surface "Existing PRs" on the issue detail page (#76).
 */

export type LinkedPullRequest = {
    number: number;
    title: string;
    html_url: string;
    state: 'open' | 'closed';
    draft: boolean;
    user_login: string;
};

export type GhSearchItem = {
    number: number;
    title: string;
    html_url: string;
    state: string;
    body?: string | null;
    draft?: boolean;
    pull_request?: { url: string };
    user?: { login?: string };
};

/** owner/repo with no spaces or extra path segments */
const REPO_FULL_NAME = /^[^/\s]+\/[^/\s]+$/;

/**
 * True when text mentions this issue as #N (not #N0 / GH-N / path/N).
 * Matches common closing forms: close #12, fixes #12, (#12), " #12 ".
 */
export function referencesIssueNumber(
    text: string | null | undefined,
    issueNumber: number,
): boolean {
    if (!text || !issueNumber || issueNumber < 1) return false;
    const re = new RegExp(`(?:^|[^A-Za-z0-9_/])#${issueNumber}(?!\\d)`);
    return re.test(text);
}

/**
 * Build GitHub issue-search query for PRs that mention #issueNumber.
 * openOnly=true limits to open PRs (feed badge).
 */
export function buildLinkedPullsSearchQuery(
    fullName: string,
    issueNumber: number,
    openOnly = false,
): string {
    const open = openOnly ? ' is:open' : '';
    // Quote #N so search prefers the issue reference token over bare digits.
    return `repo:${fullName} is:pr${open} "#${issueNumber}" in:title,body`;
}

function isPullSearchItem(item: GhSearchItem): boolean {
    return Boolean(item.pull_request) || Boolean(item.html_url?.includes('/pull/'));
}

/**
 * Pure map/filter/sort: keep PR search hits that reference #issueNumber,
 * dedupe by number, open first, then highest number.
 */
export function filterLinkedPullItems(
    items: GhSearchItem[],
    issueNumber: number,
): LinkedPullRequest[] {
    if (!issueNumber || issueNumber < 1 || !Array.isArray(items)) return [];

    const seen = new Set<number>();
    const out: LinkedPullRequest[] = [];

    for (const item of items) {
        if (!isPullSearchItem(item)) continue;
        if (typeof item.number !== 'number' || seen.has(item.number)) continue;

        const title = item.title ?? '';
        const body = item.body ?? '';
        // Require an explicit #N mention when we have text; if both empty,
        // keep the hit (search already scoped) so we do not drop sparse payloads.
        const hasText = Boolean(title.trim() || body.trim());
        if (
            hasText &&
            !referencesIssueNumber(title, issueNumber) &&
            !referencesIssueNumber(body, issueNumber)
        ) {
            continue;
        }

        seen.add(item.number);
        out.push({
            number: item.number,
            title,
            html_url: item.html_url ?? '',
            state: item.state === 'closed' ? 'closed' : 'open',
            draft: Boolean(item.draft),
            user_login: item.user?.login ?? 'unknown',
        });
    }

    out.sort((a, b) => {
        if (a.state !== b.state) return a.state === 'open' ? -1 : 1;
        return b.number - a.number;
    });
    return out;
}

export function countOpenLinkedPulls(pulls: LinkedPullRequest[]): number {
    if (!Array.isArray(pulls)) return 0;
    return pulls.filter((p) => p.state === 'open').length;
}

export async function fetchLinkedPullRequests(
    fullName: string,
    issueNumber: number,
): Promise<LinkedPullRequest[]> {
    if (
        !fullName ||
        !REPO_FULL_NAME.test(fullName) ||
        !issueNumber ||
        issueNumber < 1
    ) {
        return [];
    }

    const q = encodeURIComponent(
        buildLinkedPullsSearchQuery(fullName, issueNumber, false),
    );

    try {
        const res = await fetch(
            `https://api.github.com/search/issues?q=${q}&per_page=10`,
            {
                headers: {
                    Accept: 'application/vnd.github+json',
                    'User-Agent': 'Lightning-Bounties-lb-next',
                },
                // Cache for 5 minutes on Next.js server
                next: { revalidate: 300 },
            } as RequestInit,
        );
        if (!res.ok) return [];
        const data = (await res.json()) as { items?: GhSearchItem[] };
        return filterLinkedPullItems(data.items ?? [], issueNumber);
    } catch {
        return [];
    }
}
