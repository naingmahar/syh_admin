 // src/firebase.js
 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
 import { getAnalytics } from "firebase/analytics";
 import { getFirestore } from 'firebase/firestore';
 import { getStorage } from 'firebase/storage';
 
 const firebaseConfig = {
    apiKey: "AIzaSyCOLyBnVy8YLnSXjXu1rZsc-rF09Nis_sI",
    authDomain: "shweywethla-49cb4.firebaseapp.com",
    databaseURL: "https://shweywethla-49cb4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shweywethla-49cb4",
    storageBucket: "shweywethla-49cb4.firebasestorage.app",
    messagingSenderId: "594546464212",
    appId: "1:594546464212:web:97389851dba108344bf241",
    measurementId: "G-6F9283EEQZ"
  };

 const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app)
 export const auth = getAuth(app);
 export const db = getFirestore(app);
 export const storage = getStorage(app);

export const FSDBCollectionName = {
    USERS:"users",
    BOOKS:"Books",
    AUTHORS:"authors",
    PUBLISHERS:"publishers",
    CATEGORIES:"categories",
    DASHBOARD:"dashboard",
    KEYWORDS:"Keywords",
 }