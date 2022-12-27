import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyARB-F1aDTxZsNJyvs3XVS2dC08tEH9qHo",
  authDomain: "chat-tapp.firebaseapp.com",
  projectId: "chat-tapp",
  storageBucket: "chat-tapp.appspot.com",
  messagingSenderId: "379383711514",
  appId: "1:379383711514:web:cf24555b32fae92a760ea3"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth();