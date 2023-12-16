import React from "react";

export default function ReportsList({ reportsByGeoPoint }) {
    return (
        <div className="reports-list">{`Hi ${reportsByGeoPoint}`}</div>
    )
}