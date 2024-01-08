import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

let uid: string;

export const getUid = () => {
    return uid;
}

export const createAuth = (fbApp, authCallBack) => {

    const firebaseAuth = getAuth(fbApp);

    signInAnonymously(firebaseAuth)
        .then((result) => {
            console.log("autonomous sign-in auccessful! ");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error ", errorCode, errorMessage);
        });

    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            authCallBack(user.uid);
            // ...
        } else {
            // User is signed out
            // ...
        }
    });

    return firebaseAuth;
}

