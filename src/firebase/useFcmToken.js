import { useEffect, useState } from 'react';
import { getMessaging, getToken, deleteToken } from 'firebase/messaging';
import firebaseApp from './firebaseConfig';

const useFcmToken = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(firebaseApp);
          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              // vapidKey:
              //   'BL_Zh2S1lSRg4BMjkuEx_20GgnpkZVAzoYNogvenN-NVZuQI13v_J8I0p2WbLLUtadwECaJg_bCOI7t06000imI',
              vapidKey: 'BAA08UIOkr8CoBiEBIDpEB3uOcaeZsSFrycsp9bDvFlKDeUPemv3bRPD52cpBfQGCoPRhytvdO1fjXK1ZhVITJk',
            });
            if (currentToken) {
              setToken(currentToken);
            } else {
              console.log(
                'No registration token available. Request permission to generate one.'
              );
            }
          }
        }
      } catch (error) {
        console.error('Error retrieving FCM token:', error,error.code);
        if (error.code === 'messaging/permission-blocked') {
          console.error('User has blocked notifications.');
        } else if (error.code === 'messaging/unsupported-browser') {
          console.error('Browser does not support push notifications.');
        }
      }
      
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;