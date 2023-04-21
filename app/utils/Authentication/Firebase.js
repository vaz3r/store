import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    OAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
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

let FirebaseInstance;
let AuthHandle;

if (getApps().length === 0) {
    FirebaseInstance = initializeApp(firebaseConfig);
    AuthHandle = initializeAuth(FirebaseInstance, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
} else {
    FirebaseInstance = getApp();
    AuthHandle = getAuth(FirebaseInstance);
}

const AuthInstance = {
    Handle: AuthHandle,
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
        browserLocalPersistence
    },
    sendPasswordResetEmail,
    signOut
};

export { FirebaseInstance, AuthInstance };