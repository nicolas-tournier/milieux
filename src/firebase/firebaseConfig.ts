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
export const firebaseApp = () => initializeApp(firebaseConfig);
