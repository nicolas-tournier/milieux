// import { onDocumentCreated, onDocumentWritten } from "firebase-functions/v2/firestore";
// import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
// import { firebaseApp } from './firebaseConfig';
// import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// const functions = getFunctions(firebaseApp());
// const firestore = getFirestore(firebaseApp());

// connectFunctionsEmulator(functions, '127.0.0.1', 5001);
// connectFirestoreEmulator(firestore, '127.0.0.1', 8080);

// this watches this collection in firestore db
// export const onCreate = onDocumentCreated("/users/{userId}", (event) => {
//     const snapshot = event.data;
//     if (!snapshot) {
//         console.log("No data assoc with event!");
//         return;
//     }

//     return;
// });

// export const onWrite = onDocumentWritten("users/{userId}", (event) => {

// });
