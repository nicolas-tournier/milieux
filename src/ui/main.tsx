import React, { useEffect, useState } from "react";

import Mapping from "./mapping";
import ReportsList from "./reportsList";
import InputPanel from "./inputPanel";
import { extractReportsByGeoPoint } from "../firestore/databaseTransact";
import { MappingUpdateContext } from "../providers/mappingUpdateContext";

export default function Main() {
  const [reportsByGeoPoint, setReportsByGeoPoint] = useState([]);
  const [currentHoveredGeoPoints, setCurrentHoveredGeoPoints] = useState([]);
  const [canUpdateMapping, setCanUpdateMapping] = useState(true);

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
      <MappingUpdateContext.Provider value={{ canUpdateMapping, setCanUpdateMapping }}>
        <InputPanel></InputPanel>
        <ReportsList reportsByGeoPoint={reportsByGeoPoint}></ReportsList>
        <Mapping
          setCurrentHoveredGeoPoints={setCurrentHoveredGeoPoints}
        ></Mapping>
      </MappingUpdateContext.Provider>
    </div>
  );
}
