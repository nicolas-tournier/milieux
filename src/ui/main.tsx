import { useEffect, useState } from "react";
import Mapping from "./mapping";
import ReportsList from "./reportsList";
import ThemeSwitcher from "./themeSwitcher";
import InputPanel from "./inputPanel";
import { extractReportsByGeoPoint } from "../firestore/databaseTransact";
import { MappingUpdateContext } from "../providers/mappingUpdateContext";
import { ThemeProvider } from "./themeProvider";

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
        <ThemeProvider>
          <ThemeSwitcher></ThemeSwitcher>
          <InputPanel></InputPanel>
          <ReportsList reportsByGeoPoint={reportsByGeoPoint}></ReportsList>
          <Mapping
            setCurrentHoveredGeoPoints={setCurrentHoveredGeoPoints}
          ></Mapping>
        </ThemeProvider>
      </MappingUpdateContext.Provider>
    </div>
  );
}
