'use client';
import { Tag } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import {
    buildLinkedPullsSearchQuery,
    countOpenLinkedPulls,
    filterLinkedPullItems,
    type GhSearchItem,
} from '@/5_shared/utils/githubLinkedPulls';

type Props = {
    fullName: string;
    issueNumber: number;
};

const cacheKey = (fullName: string, issueNumber: number) =>
    `lb-open-pr:${fullName}#${issueNumber}`;

const CACHE_TTL_MS = 5 * 60 * 1000;

/** Dedupe concurrent fetches for the same issue within one tab session. */
const inflight = new Map<string, Promise<number>>();

function readCachedCount(key: string): number | null {
    try {
        const raw = sessionStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as { n: number; t: number };
        if (Date.now() - parsed.t > CACHE_TTL_MS) return null;
        return typeof parsed.n === 'number' ? parsed.n : null;
    } catch {
        return null;
    }
}

function writeCachedCount(key: string, n: number) {
    try {
        sessionStorage.setItem(key, JSON.stringify({ n, t: Date.now() }));
    } catch {
        // ignore quota / private mode
    }
}

async function fetchOpenPrCount(
    fullName: string,
    issueNumber: number,
): Promise<number> {
    const key = cacheKey(fullName, issueNumber);
    const cached = readCachedCount(key);
    if (cached !== null) return cached;

    const existing = inflight.get(key);
    if (existing) return existing;

    const q = encodeURIComponent(
        buildLinkedPullsSearchQuery(fullName, issueNumber, true),
    );

    const promise = fetch(
        `https://api.github.com/search/issues?q=${q}&per_page=10`,
        {
            headers: { Accept: 'application/vnd.github+json' },
        },
    )
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
            if (!data) return 0;
            const items = Array.isArray(data.items)
                ? (data.items as GhSearchItem[])
                : [];
            const n = countOpenLinkedPulls(
                filterLinkedPullItems(items, issueNumber),
            );
            writeCachedCount(key, n);
            return n;
        })
        .catch(() => 0)
        .finally(() => {
            inflight.delete(key);
        });

    inflight.set(key, promise);
    return promise;
}

/**
 * Lightweight client badge: open PR count for a bounty issue (#76).
 * Fetches only when in view; session-cached + inflight-deduped to limit
 * unauthenticated GitHub search traffic on the feed.
 */
const OpenPrBadge: FC<Props> = ({ fullName, issueNumber }) => {
    const hostRef = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const el = hostRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { rootMargin: '120px' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!visible || !fullName || !issueNumber) return;

        let cancelled = false;
        const key = cacheKey(fullName, issueNumber);
        const cached = readCachedCount(key);
        if (cached !== null) {
            setCount(cached);
            return;
        }

        fetchOpenPrCount(fullName, issueNumber).then((n) => {
            if (!cancelled) setCount(n);
        });

        return () => {
            cancelled = true;
        };
    }, [visible, fullName, issueNumber]);

    return (
        <span ref={hostRef}>
            {count ? (
                <Tag color="blue" style={{ marginLeft: 8 }}>
                    {count} open PR{count === 1 ? '' : 's'}
                </Tag>
            ) : null}
        </span>
    );
};

export { OpenPrBadge };
