import React from "react";

export const MappingUpdateContext = React.createContext({
  canUpdateMapping: false,
  setCanUpdateMapping: (canUpdateMapping: boolean) => {},
});
