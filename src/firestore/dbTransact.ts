import { firebaseApp } from "../firebase/firebaseConfig";
import { getGeolocation } from "../firebase/utils";
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    getFirestore,
} from "firebase/firestore";

export async function createReportOnAuth(uid: string) {

    const fbApp = firebaseApp();
    const fsDb = getFirestore(fbApp);

    let geoLoc = await getGeolocation().then((pos: any) => {
        return [pos.coords.latitude, pos.coords.longitude];
    });

    const report = {
        uid: uid,
        location: geoLoc,
    };

    const q = query(collection(fsDb, "reports"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, report);
    } else {
        await addDoc(collection(fsDb, "reports"), report);
    }
}