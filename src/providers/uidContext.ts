import React from 'react';

export const UidContext = React.createContext({
  uid: '',
  setUid: (uid: string) => {},
});