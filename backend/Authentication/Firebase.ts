import * as FirebaseAdmin from 'firebase-admin';
import ServiceAccount from "./ServiceAccount.json";

const ServiceParameters = ServiceAccount as any;

FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(ServiceParameters)
});

export const DeleteUser = async (UID: string) => {
    return await FirebaseAdmin.auth().deleteUser(UID);
};

export const VerifyToken = async (idToken: string) => {
    return await FirebaseAdmin.auth().verifyIdToken(idToken);
};