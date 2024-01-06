import { useEffect, useState } from "react";
import Mapping from "./mapping";
import ReportsList from "./reportsList";
import ThemeSwitcher from "./themeSwitcher";
import InputPanel from "./inputPanel";
import { extractReportsByGeoPoint } from "../firestore/databaseTransact";
import { MappingUpdateProvider } from "../providers/mappingUpdateContext";
import { TimespanProvider } from "../providers/timeSpanProvider";
import { ThemeProvider } from "../providers/themeProvider";
import ScrollInfo from "./scrollInfo";
import { ScrollProvider, UserIsScrollingProvider } from "../providers/scrollContext";
import MinimumDistanceSlider from "./minDistanceSlider";

export default function Main({ dateSpan, setDateSpan }) {
  const [reportsByGeoPoint, setReportsByGeoPoint] = useState([]);
  const [currentHoveredGeoPoints, setCurrentHoveredGeoPoints] = useState([]);

  useEffect(() => {
    getReportsByGeopoint();
  }, [currentHoveredGeoPoints]);

  function getReportsByGeopoint() {
    extractReportsByGeoPoint(currentHoveredGeoPoints).then(
      (reports) => {
        setReportsByGeoPoint(reports);
      }
    );
  }

  return (
    <div className="main">
      <MappingUpdateProvider>
        <ThemeProvider>
          <ThemeSwitcher></ThemeSwitcher>
          <TimespanProvider>
            <MinimumDistanceSlider></MinimumDistanceSlider>
          </TimespanProvider>
          <ScrollProvider>
            <UserIsScrollingProvider>
              <ScrollInfo></ScrollInfo>
              <InputPanel></InputPanel>
              <ReportsList reportsByGeoPoint={reportsByGeoPoint}></ReportsList>
              <Mapping
                setCurrentHoveredGeoPoints={setCurrentHoveredGeoPoints}
              ></Mapping>
            </UserIsScrollingProvider>
          </ScrollProvider>
        </ThemeProvider>
      </MappingUpdateProvider>
    </div>
  );
}
