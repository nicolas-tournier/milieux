import React, { useState } from 'react';

export const ScrollContext = React.createContext({
  isReportsListScrollbar: false,
  setIsReportsListScrollbar: (isReportsListScrollbar: boolean) => { },
});

export function ScrollProvider({ children }) {
  const [isReportsListScrollbar, setIsReportsListScrollbar] = useState(false);

  return (
    <ScrollContext.Provider value={{ isReportsListScrollbar, setIsReportsListScrollbar }} >
      {children}
    </ScrollContext.Provider>
  );
}

export const UserIsScrollingContext = React.createContext({
  userIsScrolling: false,
  setUserIsScrolling: (userIsScrolling: boolean) => { },
});

export function UserIsScrollingProvider({ children }) {
  const [userIsScrolling, setUserIsScrolling] = useState(false);

  return (
    <UserIsScrollingContext.Provider value={{ userIsScrolling, setUserIsScrolling }} >
      {children}
    </UserIsScrollingContext.Provider>
  );
}