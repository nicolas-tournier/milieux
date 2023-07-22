/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as functions from 'firebase-functions';
import {
    onDocumentCreated
} from "firebase-functions/v2/firestore";

export const helloWorld = onRequest((request, response) => {
    console.log('onRequest');
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});


// this watches this collection in firestore db and fires
export const onCreateUser = onDocumentCreated("users/{userId}", (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        console.log("No data assoc with event");
        return;
    }

    const data = snapshot.data();
    console.log('data ', data);
    
});