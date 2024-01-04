import { useEffect, useState } from "react";
import Mapping from "./mapping";
import ReportsList from "./reportsList";
import ThemeSwitcher from "./themeSwitcher";
import InputPanel from "./inputPanel";
import { extractReportsByGeoPoint } from "../firestore/databaseTransact";
import { MappingUpdateContext } from "../providers/mappingUpdateContext";
import { ThemeProvider } from "./themeProvider";
import ScrollInfo from "./scrollInfo";
import { ScrollContext, UserIsScrollingContext } from "../providers/scrollContext";

export default function Main() {
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
