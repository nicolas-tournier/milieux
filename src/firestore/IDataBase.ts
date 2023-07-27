import { GeoPoint } from "firebase/firestore";

export interface IReport {
    uid: string;
    location: GeoPoint;
    time: string;
    comment: string;
    sentiment?: ISentiment;
}

export interface ISentiment {

}