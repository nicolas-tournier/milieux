import React, { useEffect, useState } from "react";

import Mapping from "./mapping";
import ReportsList from "./reportsList";
import InputPanel from "./inputPanel";
import { extractReportsByGeoPoint } from "../firestore/databaseTransact";

export default function Main() {
  const [reportsByGeoPoint, setReportsByGeoPoint] = useState([]);
  const [currentHoveredGeoPoints, setCurrentHoveredGeoPoints] = useState([]);

  useEffect(() => {
    getReportsByGeopoint();
  }, [currentHoveredGeoPoints]);

  function getReportsByGeopoint() {
    const reports = extractReportsByGeoPoint(currentHoveredGeoPoints).then(
      (reports) => {
        setReportsByGeoPoint(reports);
      }
    );
  }

  return (
    <div className="main">
      <InputPanel></InputPanel>
      <ReportsList reportsByGeoPoint={reportsByGeoPoint}></ReportsList>
      <Mapping
        setCurrentHoveredGeoPoints={setCurrentHoveredGeoPoints}
      ></Mapping>
    </div>
  );
}
