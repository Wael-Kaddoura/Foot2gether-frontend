import firebase from "firebase";

// var otherProjectFirebaseConfig = {
//   apiKey: "AIzaSyDs0P3cNbVIwNfYr-0bdk30WgsVUA7wcjg",
//   databaseURL:
//     "https://foot2gether-default-rtdb.europe-west1.firebasedatabase.app/",
// };
// var otherProject = firebase.initializeApp(otherProjectFirebaseConfig, "other");
// export const db = otherProject;
// var firepadRef = otherProject.database().ref();
// export function Kosa() {
//   const userName = prompt("What's your name?");
//   const urlparams = new URLSearchParams(window.location.search);
//   const roomId = urlparams.get("id");

//   if (roomId) {
//     firepadRef = firepadRef.child(roomId);
//   } else {
//     firepadRef = firepadRef.push();
//     window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
//   }

//   return userName;
// }

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
