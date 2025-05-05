import { Login } from '@/1_pages/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login page | LB',
    // description: 'TODO: ADD description ',
};

export default function LoginPage() {
    return <Login />;
}
