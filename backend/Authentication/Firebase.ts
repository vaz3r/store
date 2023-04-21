import * as FirebaseAdmin from 'firebase-admin';
import path from 'path';

const ServiceAccount = require(path.resolve(__dirname, './ServiceAccount.json'));

FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(ServiceAccount)
});

export const DeleteUser = async (UID: string) => {
    return await FirebaseAdmin.auth().deleteUser(UID);
};

export const VerifyToken = async (idToken: string) => {
    return await FirebaseAdmin.auth().verifyIdToken(idToken);
};