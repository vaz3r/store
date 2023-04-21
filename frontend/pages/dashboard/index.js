import { UserRank } from '@/utils';
import Dashboard from '@/components/Dashboard';
import { getAuthenticatedUser } from '@/utils/Functions/Server';

export default Dashboard;

export async function getServerSideProps(ctx) {
    const User = await getAuthenticatedUser(ctx);

    if (User !== null) {
        if (User?.Rank == UserRank.Admin) {
            return {
                props: {
                    Hydrated: {
                        User: User
                    }
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/dashboard/unauthorized',
                    permanent: false,
                },
            }
        }
    }

    return {
        redirect: {
            destination: '/authenticate',
            permanent: false,
        },
    }
};