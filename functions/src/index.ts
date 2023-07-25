import { onRequest } from "firebase-functions/v2/https";
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { onDocumentCreated, onDocumentWritten } from "firebase-functions/v2/firestore";
import { firebaseApp } from './firebaseConfig';

const functions = getFunctions(firebaseApp());

connectFunctionsEmulator(functions, 'http://127.0.0.1', 5001);

export const request = onRequest((request, response) => {
    console.log('onRequest');
    response.send("Hello from Firebase!");
});

// this watches this collection in firestore db
export const onCreate = onDocumentCreated("/users/{userId}", (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        console.log("No data assoc with event!");
        return;
    }

    const data = snapshot.data();
    console.log('data??? ', data);
    return;
});

export const onWrite = onDocumentWritten("users/{userId}", (event) => {
    console.log('anything?')
});
