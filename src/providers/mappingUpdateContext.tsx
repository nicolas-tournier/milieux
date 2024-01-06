import React, { useState } from "react";

export const MappingUpdateContext = React.createContext({
  canUpdateMapping: false,
  setCanUpdateMapping: (canUpdateMapping: boolean) => { },
});

export function MappingUpdateProvider({ children }) {
  const [canUpdateMapping, setCanUpdateMapping] = useState(true);

  return (
    <MappingUpdateContext.Provider value={{ canUpdateMapping, setCanUpdateMapping }} >
      {children}
    </MappingUpdateContext.Provider>
  );
}
