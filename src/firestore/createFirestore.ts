import {
    getFirestore,
    connectFirestoreEmulator,
} from "firebase/firestore";

let fsDb;
export const getFsDb = (fbApp) => {
    if (!fsDb) {
        fsDb = getFirestore(fbApp);
        connectFirestoreEmulator(fsDb, "127.0.0.1", 8080);
    }
    return fsDb;
}
