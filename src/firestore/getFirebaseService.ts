import {
    getFirestore,
    connectFirestoreEmulator,
} from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";
import { createAuth } from "../firebase/firebaseAuth";

let fsDb;
export const getFsDb = (fbApp) => {
    if (!fsDb) {
        fsDb = getFirestore(fbApp);
        if (process.env.NODE_ENV === 'development') {
            connectFirestoreEmulator(fsDb, "127.0.0.1", 8080);
        }
    }
    return fsDb;
}

let auth;
export const getAuth = (fbApp, authCallback) => {
    if (!auth) {
        auth = createAuth(fbApp, authCallback);
        if (process.env.NODE_ENV === 'development') {
            connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        }
    }
    return auth;
}
