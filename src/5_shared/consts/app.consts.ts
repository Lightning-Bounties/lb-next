export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
export const FEED_LIMIT: number = process.env.NEXT_PUBLIC_FEED_LIMIT
    ? parseInt(process.env.NEXT_PUBLIC_FEED_LIMIT as string)
    : 10;
