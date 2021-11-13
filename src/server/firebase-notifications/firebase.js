import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA35yecDgHo1ZhHWOkCoUPUakWIfLCciL8",
  authDomain: "foot2gether-notification-5928f.firebaseapp.com",
  databaseURL:
    "https://foot2gether-notification-5928f-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "foot2gether-notification-5928f",
  storageBucket: "foot2gether-notification-5928f.appspot.com",
  messagingSenderId: "74965763793",
  appId: "1:74965763793:web:ef5a2df3e588a757c0a7f0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
