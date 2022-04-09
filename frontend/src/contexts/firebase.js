// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4rXaHJpFQMGAUYJ98I9CAAUEkYCBKUVQ",
  authDomain: "familytree-77cc9.firebaseapp.com",
  projectId: "familytree-77cc9",
  storageBucket: "familytree-77cc9.appspot.com",
  messagingSenderId: "808323892513",
  appId: "1:808323892513:web:2650321837f5c82cc5aa60",
  measurementId: "G-EHGD2WBG8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;