import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { firebaseApp } from "./firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, getFsDb } from "./firestore/getFirebaseService";
import { UidContext } from "./providers/uidContext";

// import reportWebVitals from "./reportWebVitals";

const fbApp = firebaseApp();
const fsDb = getFsDb(fbApp);

function Root() {
  
  const [uid, setUid] = useState("");

  useEffect(() => {
    async function authCallback(uid) {
      await setDoc(doc(fsDb, "users", uid), { uid });
      setUid(uid);
    }
    getAuth(fbApp, authCallback);
  }, []);

  return (
    <React.StrictMode>
      <UidContext.Provider value={{ uid, setUid }}>
        <App />
      </UidContext.Provider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);