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
    GeoPoint,
} from "firebase/firestore";
import { IReport } from "./IDataBase";

export async function createRecord(uid: string) {

    const fbApp = firebaseApp();
    const fsDb = getFirestore(fbApp);

    let geoLoc = await getGeolocation().then((pos: any) => {
        return new GeoPoint(pos.coords.latitude, pos.coords.longitude);
    });

    const report: IReport = {
        uid: uid,
        location: geoLoc,
        time: new Date().toDateString(),
        comment: ''
    };

    await addDoc(collection(fsDb, "reports"), report);
}