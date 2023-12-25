import React from 'react';

export const ScrollContext = React.createContext({
  isScrolling: false,
  setIsScrolling: (isScrolling: boolean) => {},
});