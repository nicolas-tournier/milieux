import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

let uid: string;

export const getUid = () => {
    return uid;
}

export const createAuth = (fbApp, authCallBack) => {

    const firebaseAuth = getAuth(fbApp);

    signInAnonymously(firebaseAuth)
        .then(() => {
            console.log('signed in!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error ', errorCode, errorMessage);
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
}

