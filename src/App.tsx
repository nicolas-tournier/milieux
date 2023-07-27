import React from "react";
import "./App.css";
import ScreenGrid from "./screen-grid/screen-grid";

function App() {
  return (
    <div id="app" className="app">
      <ScreenGrid disableGPUAggregation={()=>{}}></ScreenGrid>
    </div>
  );
}

export default App;
