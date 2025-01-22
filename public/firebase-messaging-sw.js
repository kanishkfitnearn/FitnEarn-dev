//firebase-messaging-sw.js in 
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBsTl_rk7zrRZffg5J1byCad_owACI_kmw",
    authDomain: "fitnearn-website-d1205.firebaseapp.com",
    projectId: "fitnearn-website-d1205",
    storageBucket: "fitnearn-website-d1205.firebasestorage.app",
    messagingSenderId: "139412011537",
    appId: "1:139412011537:web:10c5e2a6905a38112b4fb0",
    measurementId: "G-6B87J63S4Y"
  };
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
