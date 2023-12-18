import { firebaseApp } from "../firebase/firebaseConfig";
import { getGeolocation } from "../utils/utils";
import {
    addDoc,
    collection,
    GeoPoint,
    getDocs,
    getDocsFromCache,
    onSnapshot
} from "firebase/firestore";
import { IReport } from "./IDataBase";
import { getFsDb } from "./createFirestore";
import intersection from 'lodash/intersection';

const fbApp = firebaseApp();
const fsDb = getFsDb(fbApp);

export async function createRecord(uid: string) {

    let geoLoc = await getGeolocation().then((pos: any) => {
        return new GeoPoint(pos.coords.latitude + (Math.random() / 100), pos.coords.longitude + (Math.random() / 100)); // this needs reverting!!!!
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
    onSnapshot(collection(fsDb, "reports"),
        async (snapshot) => {
            let mapData: Array<any> = [];
            snapshot.docs.forEach((doc: any) => {
                const data = doc.data();
                const entry = [data.location.longitude, data.location.latitude, data.sentiment?.meanWeight];
                mapData.push(entry);
            });
            callback(mapData);
        }, async (error) => {
            console.log('error ', error);
        });

}

export async function extractReportsByGeoPoint(dataSet) {
    const reports = await getDocsFromCache(collection(fsDb, "reports")) as any;
    const docs: Array<any> = reports.docs;
    let matchedReports: Array<any> = [];
    docs.forEach(doc => {
        const docData = doc.data();
        const location = [docData.location.longitude, docData.location.latitude];
        const filtered = dataSet.filter(data => intersection(data, location).length === location.length);
        if (filtered.length > 0) {
            matchedReports.push(docData);
        }
    });
    return matchedReports;
}