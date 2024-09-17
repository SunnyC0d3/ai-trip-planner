import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBAHkNndKrS3PPevszNxQi8ioVdaTVghQI",
    authDomain: "ai-trip-planner-1f62f.firebaseapp.com",
    projectId: "ai-trip-planner-1f62f",
    storageBucket: "ai-trip-planner-1f62f.appspot.com",
    messagingSenderId: "623760338032",
    appId: "1:623760338032:web:a5f91ec00eeb8ca9fcd8b5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);