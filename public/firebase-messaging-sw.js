// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCNmmrkaYgc_Y4DEwWfJyIp5RJjHF6_gSI",
  authDomain: "foodoffers-2cedb.firebaseapp.com",
  databaseURL:
    "https://foodoffers-2cedb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodoffers-2cedb",
  storageBucket: "foodoffers-2cedb.firebasestorage.app",
  messagingSenderId: "949249409105",
  appId: "1:949249409105:web:56dc2befc107e3ad25b870",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // if (payload.notificationData) {
  //   const notificationTitle = payload.notification.title;
  //   const notificationOptions = {
  //     body: payload.notification.body,
  //     icon: payload.notification.image,
  //   };

  //   self.registration.showNotification(notificationTitle, notificationOptions);
  // }
});
