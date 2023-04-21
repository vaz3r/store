import { initializeApp } from 'firebase/app';
import {
    getAuth,
    OAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    setPersistence,
    indexedDBLocalPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    FacebookAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithCredential,
    onIdTokenChanged,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBi8iou_vIVKqRK5ZKPjOWULJLyh1bAVh0",
    authDomain: "projectx-e9fc2.firebaseapp.com",
    databaseURL: "https://projectx-e9fc2.firebaseio.com",
    projectId: "projectx-e9fc2",
    storageBucket: "projectx-e9fc2.appspot.com",
    messagingSenderId: "1018858332295",
    appId: "1:1018858332295:web:70b14c2b40ad0e97399822"
};

const FirebaseInstance = initializeApp(firebaseConfig);

const AuthInstance = {
    Handle: getAuth(FirebaseInstance),
    Listeners: {
        onAuthStateChanged,
        onIdTokenChanged
    },
    Social: {
        FacebookAuthProvider,
        GoogleAuthProvider,
        OAuthProvider,
        signInWithRedirect,
        signInWithPopup,
        signInWithCredential
    },
    Local: {
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
    },
    Persistence: {
        setPersistence,
        browserLocalPersistence,
        browserSessionPersistence,
        indexedDBLocalPersistence
    },
    sendPasswordResetEmail,
    signOut
};

export { FirebaseInstance, AuthInstance };