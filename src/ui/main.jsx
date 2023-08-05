import { useState } from "react";
import Mapping from "./mapping";
import ReportsList from "./reportsList";
import { extractReportsByGeoPoint } from "../firestore/databaseTransact";


export default function Main() {

    const [reportsByGeoPoint, setReportsByGeoPoint] = useState([]);
    const [currentHoveredGeoPoints, setCurrentHoveredGeoPoints] = useState([]);

    getReportsByGeopoint();

    function getReportsByGeopoint() {
        extractReportsByGeoPoint(currentHoveredGeoPoints);
    }

    return (
        <>
            <ReportsList reportsByGeoPoint={reportsByGeoPoint}></ReportsList>
            <Mapping setCurrentHoveredGeoPoints={setCurrentHoveredGeoPoints}></Mapping>
        </>
    )
}