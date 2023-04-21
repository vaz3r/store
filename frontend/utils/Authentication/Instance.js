import nookies from 'nookies';

import { Endpoints } from '../';
import { AuthInstance } from './Firebase';

let Interval = null;
let Unsubscribe = null;

const RefreshToken = async (Source, UserCredentials = null) => {
    try {
        const User = UserCredentials != null ? UserCredentials : AuthInstance.Handle?.currentUser;

        if (User != undefined) {
            const Token = await User.getIdToken(false);
            nookies.set(null, "_JWTOKEN", Token, { path: '/' });

            console.info(`[${Source}] Token has been refreshed.`);
        } else {
            console.info(`[${Source}] Token has expired.`);
            nookies.destroy(null, "_JWTOKEN");
        }
    } catch (error) {
        console.log(error);
    }
};

const HydrateToken = () => {
    const IntervalMS = (60 * 1000) * 1;

    Interval = setInterval(async () => {
        await RefreshToken("Interval");
    }, IntervalMS);

    Unsubscribe = AuthInstance.Listeners.onIdTokenChanged(AuthInstance.Handle, async (UserCredentials) => {
        try {
            RefreshToken("IdTokenChanged", UserCredentials);
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

const PatchUser = async (User) => {
    try {
        const Response = await (await fetch(`${Endpoints.USER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UID: User.user.uid,
                FullName: User.user.displayName != undefined ? User.user.displayName : '',
                Email: User.user.email,
                Photo: User.user.photoURL != null ? User.user.photoURL : '',
                Provider: User.user?.providerData[0]?.providerId != null ? User.user?.providerData[0]?.providerId : '',
            })
        })).json();

        if (Response?.Status == 200) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }

    return false;
};

const Local = {
    SignIn: async (Email, Password) => {
        try {
            await AuthInstance.Persistence.setPersistence(AuthInstance.Handle, AuthInstance.Persistence.browserLocalPersistence);

            const Response = await AuthInstance.Local.signInWithEmailAndPassword(AuthInstance.Handle, Email, Password);
            const Insertion = await PatchUser(Response);

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
            await AuthInstance.Persistence.setPersistence(AuthInstance.Handle, AuthInstance.Persistence.browserLocalPersistence);

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
    LoggedIn: async () => {
        try {
            return await new Promise((resolve, reject) => {
                AuthInstance.Listeners.onIdTokenChanged(AuthInstance.Handle, async (UserCredentials) => {
                    try {
                        if (UserCredentials !== null && UserCredentials !== undefined) {
                            resolve(true);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    
                    resolve(false);
                });
            });
        } catch (error) {
            return false;
        }
    },
    CurrentUser: () => {
        try {
            return AuthInstance.Handle.currentUser;
        } catch (error) {
            console.log(error);
        }

        return null;
    },
    SignOut: async () => {
        try {
            Unsubscribe();
            clearInterval(Interval);

            await AuthInstance.signOut(AuthInstance.Handle);

            nookies.destroy(null, "_JWTOKEN");

            setTimeout(() => window.location.reload(), 1000);
            return true;
        } catch (error) {
            return false;
        }
    },
    UserExists: async (Email) => {
        try {
            await AuthInstance.Local.signInWithEmailAndPassword(AuthInstance.Handle, Email, 'password');
            return true;
        } catch (error) {
            if (error.code == 'auth/wrong-password') {
                return true;
            } else {
                return false;
            }
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

export default { HydrateToken, Local, Functions };