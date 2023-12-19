import React, { useEffect, useState } from "react";

export default function ReportsList({ reportsByGeoPoint }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      let x = event.clientX + 50;
      let y = event.clientY - 25;

      // Get the width and height of the reports list
      const reportsList = document.querySelector(
        ".reports-list"
      ) as HTMLElement;

      const reportsListWidth = reportsList ? reportsList.offsetWidth : 0;
      const reportsListHeight = reportsList ? reportsList.offsetHeight : 0;

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

      setPosition({ x, y });
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
      className="reports-list bg-white p-4 rounded shadow-lg max-w-xl absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: "none",
      }}
    >
      <ul className="list-none list-inside space-y-2">
        {reportsByGeoPoint.map((report, index) => (
          <li key={index} className="text-gray-700">
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
    <div className="space-y-1">
      <p className="text-sm text-gray-500 whitespace-nowrap">{report.time}</p>
      <p>{report.comment || "howdy doodee how is it that ye doo dee ??"}</p>
      <hr></hr>
    </div>
  );
}
