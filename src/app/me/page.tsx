import { Me } from '@/1_pages/me';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profile | LB',
    // description: 'TODO: ADD description ',
};

export default function ProfilePage() {
    return <Me />;
}
