import { Metadata } from 'next';
import { Profile } from '@/1_pages/profile';
import { profileApi } from '@/4_entities/profile';
import { cache } from 'react';

const getUserFullData = cache(async (id: string) => {
    const data = await profileApi.getUserFullData(id);
    return data;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.page;
    const data = await getUserFullData(id);

    return {
        title: (data.userInfo.github_username ?? 'Profile Page') + ' | LB',
        // description: 'TODO: ADD description'
    };
}

type Props = {
    params: { page: string };
};

export default async function ProfilePage({ params }: Props) {
    const id = params.page;
    const data = await getUserFullData(id);
    return (
        <Profile
            userInfo={data.userInfo}
            userRewards={data.userRewards}
            userBounties={data.userBounties}
        />
    );
}
