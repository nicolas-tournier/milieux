import { firebaseApp } from "../firebase/firebaseConfig";
import { getGeolocation } from "../firebase/utils";
import {
    addDoc,
    collection,
    GeoPoint,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import { IReport } from "./IDataBase";
import { getFsDb } from "./createFirestore";

const fbApp = firebaseApp();
const fsDb = getFsDb(fbApp);

export async function createRecord(uid: string) {

    let geoLoc = await getGeolocation().then((pos: any) => {
        return new GeoPoint(pos.coords.latitude  + (Math.random()/100), pos.coords.longitude + (Math.random()/100)); // this needs reverting!!!!
    });

    const report: IReport = {
        uid: uid,
        location: geoLoc,
        time: new Date().toDateString(),
        comment: '',
        sentiment: {
            meanWeight: 1 + (Math.floor(Math.random() * 14)) // this needs reverting!!!!
        }
    };

    await addDoc(collection(fsDb, "reports"), report);
}


export function getMapData(callback) {
    onSnapshot(collection(fsDb, "reports"), async () => {
        const reports = await getDocs(collection(fsDb, "reports"));
        let mapData: Array<any> = [];
        reports.forEach((doc: any) => {
            const data = doc.data();
            const entry = [data.location.longitude, data.location.latitude, data.sentiment?.meanWeight];
            mapData.push(entry);
        });
        callback(mapData)
    });
}

// export function getMapData(callback) {
//     onSnapshot(collection(fsDb, "reports"), async () => {
//         const reports = await getDocs(collection(fsDb, "reports"));
//         let mapData: Array<any> = [];
//         reports.forEach((doc: any) => {
//             const data = doc.data();
//             const entry = [data.location.longitude, data.location.latitude, data.sentiment?.meanWeight];
//             let arr = new Array(10).fill(0);
//             arr.forEach((val, index) => {
//                 let [a, b, c] = entry;
//                 let e = [a + (Math.random()/100), b  + (Math.random()/100), c];
//                 mapData.push(e);
//             });
//             mapData.push(entry);
//         });
//         callback(mapData);
//     });
// }