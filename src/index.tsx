import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDjU-_Zq6uuvIpUPmS2tHB-MwDSZAwm3gU",
  authDomain: "milieux-b9d27.firebaseapp.com",
  projectId: "milieux-b9d27",
  storageBucket: "milieux-b9d27.appspot.com",
  messagingSenderId: "450531836406",
  appId: "1:450531836406:web:eed5dea389557ff8e7c7d7",
  measurementId: "G-9FN5RL4CVD"
};

// Initialize Firebase
initializeApp(firebaseConfig);

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
