import React, { useState } from "react";
import "./app.css";
import Main from "./ui/main";
import { ScrollContext } from "./context/scrollContext";

function App() {

  const [isScrolling, setIsScrolling] = useState(false);

  return (
    <ScrollContext.Provider value={{ isScrolling, setIsScrolling }}>
      <div id="app" className="app">
        <Main></Main>
      </div>
    </ScrollContext.Provider>
  );
}

export default App;
