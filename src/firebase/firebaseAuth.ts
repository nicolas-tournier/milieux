import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

export const createAuth = (fbApp) => {

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
            const uid = user.uid;
            console.log('uid ', uid);
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}

