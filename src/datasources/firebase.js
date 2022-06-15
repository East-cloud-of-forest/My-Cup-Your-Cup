// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYX6ARJoL4o85wYhRK9vtTzsXiOBhhk1w",
  authDomain: "mycup-yourcup.firebaseapp.com",
  projectId: "mycup-yourcup",
  storageBucket: "mycup-yourcup.appspot.com",
  messagingSenderId: "276042250201",
  appId: "1:276042250201:web:b2f5b07a67e315699c8bc8",
  measurementId: "G-F8RG45WD8Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// cloud Firestore 초기화
export const db = getFirestore(app);

const analytics = getAnalytics(app);
