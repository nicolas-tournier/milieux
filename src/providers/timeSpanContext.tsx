import React, { createContext, useState } from 'react';

export interface IDateSpan {
    startDate: number;
    endDate: number;
}

export const earliestDate = new Date(2024, 0, 1).getTime();

export const TimespanContext = createContext({
    dateSpan: {
        startDate: earliestDate,
        endDate: new Date().getTime(),
    },
    setDateSpan: (dateSpan: IDateSpan) => { },
});


export function TimespanProvider({ children }) {
    const [dateSpan, setDateSpan] = useState({
        startDate: earliestDate,
        endDate: new Date().getTime(),
    });

    return (
        <TimespanContext.Provider value={{ dateSpan, setDateSpan }} >
            {children}
        </TimespanContext.Provider>
    );
}