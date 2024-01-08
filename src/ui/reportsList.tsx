import React, { useContext, useEffect, useRef, useState } from "react";
import { colorRange } from "../const/constants";
import { ScrollContext } from "../providers/scrollContext";

export default function ReportsList({ reportsByGeoPoint }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reportsListRef = useRef(null);
  const { setIsReportsListScrollbar } = useContext(ScrollContext);

  useEffect(() => {
    const handleWheel = (event) => {
      const reportsListElement: HTMLElement = reportsListRef.current;
      if (reportsListElement) {
        const canScrollUp = reportsListElement.scrollTop > 0;
        const canScrollDown = reportsListElement.scrollTop < reportsListElement.scrollHeight - reportsListElement.clientHeight;
        const direction = event.deltaY > 0 ? 1 : -1;
        if ((direction > 0 && canScrollDown) || (direction < 0 && canScrollUp)) {
          // If the element can be scrolled in the direction of the scroll event, it prevents the default scroll behavior with event.preventDefault()
          event.preventDefault();
          reportsListElement.scrollTop += direction * 30;
        }
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      let x = event.clientX + 50;
      let y = event.clientY - 25;

      const reportsListElement = reportsListRef.current;
      const hasVerticalScrollbar = reportsListElement?.scrollHeight > reportsListElement?.clientHeight;

      setIsReportsListScrollbar(hasVerticalScrollbar);

      const reportsListWidth = reportsListElement ? reportsListElement.offsetWidth : 0;
      const reportsListHeight = reportsListElement ? reportsListElement.offsetHeight : 0;

      // Check if the reports list would go off the right edge of the screen
      if (x + reportsListWidth > window.innerWidth) {
        x = event.clientX - reportsListWidth - 50;
      }

      // Check if the reports list would go off the bottom edge of the screen
      if (y + reportsListHeight > window.innerHeight) {
        y = window.innerHeight - reportsListHeight - 50;
      } else {
        y = y - 50;
      }

      if (y < 0) {
        y = 10;
      }

      setPosition({ x: x + 10, y: y + 10 });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!reportsByGeoPoint || reportsByGeoPoint.length === 0) {
    return null;
  }
  return (
    <div
      ref={reportsListRef}
      className="reports-list bg-white p-2 rounded shadow-lg max-w-xl md:max-w-xs overflow-auto scrollbar absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        maxHeight: "calc(100vh - 30px)",
      }}
    >
      <ul className="list-none list-inside space-y-2 pointer-events-auto">
        {reportsByGeoPoint
        .sort((a, b) => Date.parse(b.time) - Date.parse(a.time))
        .map((report, index) => (
          <li key={index} className="text-gray-700 pointer-events-none">
            {createReportSummary(report)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function createReportSummary(rep) {
  const report = JSON.parse(JSON.stringify(rep));
  return (
    <div
      style={{
        backgroundColor: getColor(report.sentiment?.meanWeight),
      }}
    >
      <div className="p-[5px]">
        <p className="text-sm text-gray-900 whitespace-nowrap">{report.time}</p>
        <p className="font-semibold text-black">
          {report.comment}
        </p>
      </div>
    </div>
  );
}

function getColor(value) {
  const valueRange = [-1, 1];
  const segmentSize = (valueRange[1] - valueRange[0]) / (colorRange.length - 1);
  const index = Math.min(
    Math.floor((value - valueRange[0]) / segmentSize),
    colorRange.length - 1
  );
  const colorArray = colorRange[index];
  const rgbaColor = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]
    }, ${Math.min(Math.max(colorArray[3] / 255, 0.2), 0.8)})`;
  return rgbaColor;
}
