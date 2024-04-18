// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIxTEbkGXHfad_-Dcv3Zz4iBh7oNcMMxA",
  authDomain: "blogging-app-cb398.firebaseapp.com",
  projectId: "blogging-app-cb398",
  storageBucket: "blogging-app-cb398.appspot.com",
  messagingSenderId: "492765958249",
  appId: "1:492765958249:web:b257b987b1bece8b1ad2f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

