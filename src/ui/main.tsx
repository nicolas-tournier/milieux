import { useEffect, useState } from "react";
import Mapping from "./mapping";
import ReportsList from "./reportsList";
import ThemeSwitcher from "./themeSwitcher";
import InputPanel from "./inputPanel";
import { extractReportsByGeoPoint } from "../firestore/databaseTransact";
import { MappingUpdateContext } from "../providers/mappingUpdateContext";
import { TimespanContext, TimespanProvider } from "../providers/timeSpanContext";
import { ThemeProvider } from "../providers/themeProvider";
import ScrollInfo from "./scrollInfo";
import { ScrollContext, UserIsScrollingContext } from "../providers/scrollContext";
import MinimumDistanceSlider from "./minDistanceSlider";

export default function Main({ dateSpan, setDateSpan }) {
  const [reportsByGeoPoint, setReportsByGeoPoint] = useState([]);
  const [currentHoveredGeoPoints, setCurrentHoveredGeoPoints] = useState([]);
  const [canUpdateMapping, setCanUpdateMapping] = useState(true);
  const [isReportsListScrollbar, setIsReportsListScrollbar] = useState(false);
  const [userIsScrolling, setUserIsScrolling] = useState(false);

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
      <MappingUpdateContext.Provider value={{ canUpdateMapping, setCanUpdateMapping }}>
        <ThemeProvider>
          <ThemeSwitcher></ThemeSwitcher>
          <TimespanProvider>
            <MinimumDistanceSlider></MinimumDistanceSlider>
          </TimespanProvider>
          <ScrollContext.Provider value={{ isReportsListScrollbar, setIsReportsListScrollbar }}>
            <UserIsScrollingContext.Provider value={{ userIsScrolling, setUserIsScrolling }}>
              <ScrollInfo></ScrollInfo>
              <InputPanel></InputPanel>
              <ReportsList reportsByGeoPoint={reportsByGeoPoint}></ReportsList>
              <Mapping
                setCurrentHoveredGeoPoints={setCurrentHoveredGeoPoints}
              ></Mapping>
            </UserIsScrollingContext.Provider>
          </ScrollContext.Provider>
        </ThemeProvider>
      </MappingUpdateContext.Provider>
    </div>
  );
}
