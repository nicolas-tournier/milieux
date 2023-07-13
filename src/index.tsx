import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp, getApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCTEodBzOkvLL4QHjdhbfo_bnu8HcMqKSQ",
  authDomain: "milieux-15d1f.firebaseapp.com",
  databaseURL: "https://milieux-15d1f-default-rtdb.firebaseio.com",
  projectId: "milieux-15d1f",
  storageBucket: "milieux-15d1f.appspot.com",
  messagingSenderId: "710937678877",
  appId: "1:710937678877:web:cfba7b1a048b56f74062f4",
  measurementId: "G-MSB98TT8RN",
};

// Initialize Firebase
initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function () {
  let loadEl = document.querySelector("#load");

  try {
    let app = getApp();
    console.log('? ', app['functions']);
    let features = [
      "auth",
      "database",
      "firestore",
      "functions",
      "messaging",
      "storage",
      "analytics",
      "remoteConfig",
      "performance",
    ].filter((feature) => typeof app[feature] === "function");
    loadEl.textContent = `Firebase SDK loaded with ${features.join(", ")}`;
  } catch (e) {
    console.error("error!!!", e);
    loadEl.textContent = "Error loading the Firebase SDK, check the console.";
  }
});

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
