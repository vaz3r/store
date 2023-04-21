import { useAuthenticationStore } from '../Store/Store';
import { AuthInstance } from './Firebase';

const Update = {
    Token: useAuthenticationStore.getState().setToken,
    User: useAuthenticationStore.getState().setUser,
    LoggedIn: useAuthenticationStore.getState().setLoggedIn
};

const AuthSubscription = () => {
    const Unsubscribe = AuthInstance.Listeners.onAuthStateChanged(AuthInstance.Handle, async (UserCredentials) => {
        try {
            const User = UserCredentials != null ? UserCredentials : AuthInstance.Handle?.currentUser;

            if (User != undefined) {
                const Token = await User.getIdToken(false);

                Update.Token(Token);
                Update.LoggedIn(true);

                console.info(`[Authentication] Token has been refreshed.`);
            } else {
                Update.Token(null);
                Update.LoggedIn(false);

                console.info(`[Authentication] Token has expired.`);
            }
        } catch (error) {
            console.log(error);
        }
    });

    return Unsubscribe;
};

const ProcessError = (Error) => {
    switch (Error?.code) {
        case "auth/email-already-in-use":
            return "Email is already in use by another account, please login.";
        case "auth/wrong-password":
            return "Wrong password!";
        case "auth/account-exists-with-different-credential":
            return "Account exists with different provider credential.";
        case "auth/popup-blocked":
            return "Popup has been blocked by the browser."
        case "auth/network-request-failed":
            return "There has been a network request error.";
        case "auth/too-many-requests":
            return "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
        case "auth/user-token-expired":
            return "The user's credential has expired.";
        default:
            return Error?.message;
    }
};

const Local = {
    SignIn: async (Email, Password) => {
        try {
            const Response = await AuthInstance.Local.signInWithEmailAndPassword(AuthInstance.Handle, Email, Password);
            // const Insertion = await PatchUser(Response);

            return {
                Payload: Response,
                Success: true
            }
        } catch (error) {
            console.log(error);

            return {
                Success: false,
                Error: ProcessError(error)
            }
        }
    },
    SignUp: async (Email, Password) => {
        try {
            const Response = await AuthInstance.Local.createUserWithEmailAndPassword(AuthInstance.Handle, Email, Password);
            const Insertion = await PatchUser(Response);

            if (Insertion) {
                return {
                    Success: true
                }
            }
        } catch (error) {
            console.log(error);
            return {
                Success: false,
                Error: ProcessError(error)
            }
        }

        return {
            Success: false
        }
    }
};

const Functions = {
    SignOut: async () => {
        try {
            Update.LoggedIn(false);
            Update.Token(null);
            Update.User(null);

            await AuthInstance.signOut(AuthInstance.Handle);
            return true;
        } catch (error) {
            return false;
        }
    },
    ResetPassword: async (Email) => {
        try {
            await AuthInstance.Local.sendPasswordResetEmail(AuthInstance.Handle, Email);
            return true;
        } catch (error) {
            return false;
        }
    }
};


export default { AuthSubscription, Local, Functions };