import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { firebaseApp } from "./firebase/firebaseConfig";
import reportWebVitals from "./reportWebVitals";
import { createAuth } from "./firebase/firebaseAuth";
import { getGeolocation } from "./firebase/utils";
import {
  getFirestore,
  connectFirestoreEmulator,
  addDoc,
  collection,
  setDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

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
reportWebVitals();

const fbApp = firebaseApp();
const fsDb = getFirestore(fbApp);
connectFirestoreEmulator(fsDb, "127.0.0.1", 8080);

async function authCallback(uid) {
  await setDoc(doc(fsDb, "users", uid), {
    uid,
  });

  let geoLoc = await getGeolocation().then((pos: any) => {
    return [pos.coords.latitude, pos.coords.longitude];
  });

  const report = {
    uid: uid,
    location: geoLoc,
  };

  const q = query(collection(fsDb, "reports"), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, report);
  } else {
    await addDoc(collection(fsDb, "reports"), report);
  }
}
createAuth(fbApp, authCallback);
