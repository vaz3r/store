import { useAuthenticationStore } from "../Store/Store";

export const getToken = () => {
    try {
        const Token = useAuthenticationStore.getState()?.Token;

        if (Token !== null && Token.length > 0) {
            return Token;
        }
    } catch (error) {
        console.log(error);
    }

    return null;
};