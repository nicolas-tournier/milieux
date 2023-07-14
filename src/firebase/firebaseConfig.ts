import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

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
let app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

const uiConfig = {
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    // tosUrl: '<your-tos-url>',
    // // Privacy policy url/callback.
    // privacyPolicyUrl: function() {
    //   window.location.assign('<your-privacy-policy-url>');
    // }
};

const ui = new firebaseui.auth.AuthUI(firebaseAuth);
ui.start('#firebaseui-auth-container', uiConfig);

signInAnonymously(firebaseAuth)
  .then(() => {
    // Signed in..
    console.log('signed in!');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error ', errorCode, errorMessage);
  });

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log('uid ', uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });