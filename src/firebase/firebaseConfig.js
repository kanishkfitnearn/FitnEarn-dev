// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDyh6VBK1Socwezq61US5MqAbgw9DTd2xk",
//   authDomain: "notifysystem-ad570.firebaseapp.com",
//   projectId: "notifysystem-ad570",
//   storageBucket: "notifysystem-ad570.firebasestorage.app",
//   messagingSenderId: "1075202757588",
//   appId: "1:1075202757588:web:1dc6940db52cdbc4e0bc41",
//   measurementId: "G-6J7SRH20EP"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBsTl_rk7zrRZffg5J1byCad_owACI_kmw",
  authDomain: "fitnearn-website-d1205.firebaseapp.com",
  projectId: "fitnearn-website-d1205",
  storageBucket: "fitnearn-website-d1205.firebasestorage.app",
  messagingSenderId: "139412011537",
  appId: "1:139412011537:web:10c5e2a6905a38112b4fb0",
  measurementId: "G-6B87J63S4Y"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
export default firebaseApp;