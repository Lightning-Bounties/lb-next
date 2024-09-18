import { Feed } from '@/1_pages/feed';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bounties Feed | LB',
    // description: 'TODO: ADD description ',
}


export default function FeedPage() {
    return <Feed />
}