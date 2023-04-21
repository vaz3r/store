import { getAuthenticatedUser } from "../utils/Functions/Server";
import Authentication from "../components/Authentication";

export async function getServerSideProps(ctx) {
    const User = await getAuthenticatedUser(ctx);

    if (User != null) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        }
    }

    return {
        props: {
            User: null,
        }
    }
};

export default Authentication;