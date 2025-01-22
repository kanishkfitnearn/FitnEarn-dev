"use client"
import React, { useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseApp from '../firebase/firebaseConfig';
import useFcmToken from "@/firebase/useFcmToken";
import Cookies from 'js-cookie';

export const notificationEvent = new Event("new-notification");

export default function FireRoot() {
  const { fcmToken,notificationPermissionStatus } = useFcmToken();
  // Use the token as needed
  fcmToken && console.log('FCM token:', fcmToken);
  Cookies.set('FcmToken',fcmToken);


  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  //     const messaging = getMessaging(firebaseApp);
  //     const unsubscribe = onMessage(messaging, (payload) => {
  //       console.log('Foreground push notification received:', payload);
  //       // Handle the received push notification while the app is in the foreground
  //       // You can display a notification or update the UI based on the payload
  //     });
  //     return () => {
  //       unsubscribe(); // Unsubscribe from the onMessage event
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Foreground push notification received:', payload);
        window.dispatchEvent(notificationEvent); // Trigger the event
      });

      return () => unsubscribe();
    }
  }, []);

  return <div> </div>;
}