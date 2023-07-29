import React from "react";
import "./App.css";
import Mapping from "./mapping/map";

function App() {

  
  return (
    <div id="app" className="app">
      <Mapping disableGPUAggregation={()=>{}}></Mapping>
    </div>
  );
}

export default App;
