import { Issue } from '@/1_pages/issue';
import { issueApi } from '@/4_entities/issue';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: { page: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const id = params.page
    const data = await issueApi.getIssueData(id)

    return {
        title: (data.title ?? 'Issue Page') + ' | LB',
        description: 'TODO: ADD description'
    }
}

export default async function IssuePage({ params }: any) {
    return <Issue issueId={params.page} />
}