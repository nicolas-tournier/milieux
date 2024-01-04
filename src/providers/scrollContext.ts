import React from 'react';

export const ScrollContext = React.createContext({
  isReportsListScrollbar: false,
  setIsReportsListScrollbar: (isReportsListScrollbar: boolean) => {},
});

export const UserIsScrollingContext = React.createContext({
  userIsScrolling: false,
  setUserIsScrolling: (userIsScrolling: boolean) => {},
});