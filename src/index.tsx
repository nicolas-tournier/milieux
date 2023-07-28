import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { firebaseApp } from "./firebase/firebaseConfig";
import reportWebVitals from "./reportWebVitals";
import { createAuth } from "./firebase/firebaseAuth";

import {
  setDoc,
  doc,
} from "firebase/firestore";
import { createRecord } from "./firestore/databaseTransact";
import { getFsDb } from "./firestore/createFirestore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

const fbApp = firebaseApp();
const fsDb = getFsDb(fbApp);


async function authCallback(uid) {
  await setDoc(doc(fsDb, "users", uid), {
    uid,
  });

  createRecord(uid);
}

createAuth(fbApp, authCallback);
