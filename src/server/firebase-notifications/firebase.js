import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBbQCB3wIXAwzzNCf-RVwR615ogjuLcbvQ",
  authDomain: "foot2gether-push-notifications.firebaseapp.com",
  databaseURL:
    "https://foot2gether-push-notifications-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foot2gether-push-notifications",
  storageBucket: "foot2gether-push-notifications.appspot.com",
  messagingSenderId: "653709672049",
  appId: "1:653709672049:web:2953655f3970a2ead0e5d0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
