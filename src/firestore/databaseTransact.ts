import { firebaseApp } from "../firebase/firebaseConfig";
import { getGeolocation } from "../utils/utils";
import {
    addDoc,
    collection,
    GeoPoint,
    getDocsFromCache,
    onSnapshot,
} from "firebase/firestore";
import { IReport } from "./IDataBase";
import { getFsDb } from "./getFirebaseService";
import intersection from 'lodash/intersection';
import { RecordSentiment } from "../ui/inputPanel";

const fbApp = firebaseApp();
const fsDb = getFsDb(fbApp);

export async function createRecord(uid: string, sentiment: RecordSentiment): Promise<boolean> {

    let geoLoc = await getGeolocation().then((pos: any) => {
        return new GeoPoint(pos.coords.latitude + (Math.random() / 100), pos.coords.longitude + (Math.random() / 100)); // this needs reverting!!!!
    });

    const report: IReport = {
        uid: uid,
        location: geoLoc,
        time: new Date().toDateString(),
        comment: sentiment.comment,
        sentiment: {
            meanWeight: sentiment.compound
        }
    };

    return addDoc(collection(fsDb, "reports"), report).then((docRef) => {
        return true;
    }).catch((error) => {
        console.error("Error adding document: ", error);
        return false;
    });
}

export async function hasReachedDailyCommentLimit(uid: string): Promise<boolean> {
    
    const reports = await getDocsFromCache(collection(fsDb, "reports")) as any;
    const docs: Array<any> = reports.docs;
    const today = new Date().toDateString();
    let count = 0;
    docs.forEach(doc => {
        const docData = doc.data();
        if (docData.uid === uid && docData.time === today) {
            count++;
        }
    });
    return count > 4;
}

export function getMapData(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        onSnapshot(
            collection(fsDb, "reports"),
            async (snapshot) => {
                let mapData: Array<any> = [];
                snapshot.docs.forEach((doc: any) => {
                    const data = doc.data();
                    const entry = [
                        data.location.longitude,
                        data.location.latitude,
                        data.sentiment?.meanWeight,
                        new Date(data.time).getTime(),
                    ];
                    mapData.push(entry);
                });
                resolve(mapData);
            },
            async (error) => {
                console.log('error ', error);
                reject(error);
            }
        );
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