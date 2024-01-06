import { useContext } from "react";
import "./app.css";
import Main from "./ui/main";
import { TimespanContext } from './providers/timeSpanProvider';

function App() {
  
  const { dateSpan, setDateSpan } = useContext(TimespanContext);

  return (
    <div id="app" className="app">
      <Main {
        ...{
          dateSpan,
          setDateSpan
        }
      }></Main>
    </div>
  );
}

export default App;
