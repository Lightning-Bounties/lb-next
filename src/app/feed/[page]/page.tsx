import { Feed } from '@/1_pages/feed';
import { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
    const page = params.page;

    return {
        title: 'Issue Bounties - page ' + page + ' | LB',
        // description: 'TODO: ADD description'
    };
}

export default function FeedPage({ params }: any) {
    return <Feed page={params.page} />;
}
