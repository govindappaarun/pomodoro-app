// Scripts for firebase and firebase messaging
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyCSKR_uhGMZNKORZQsmjAq-ShQu30qvK9Q',
  authDomain: 'pomofocus-d7181.firebaseapp.com',
  projectId: 'pomofocus-d7181',
  storageBucket: 'pomofocus-d7181.appspot.com',
  messagingSenderId: '472964885212',
  appId: '1:472964885212:web:bd4678004236b5cc512219',
  measurementId: 'G-242J94WKV7',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
