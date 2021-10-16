import firebase from "firebase";

var videoRoomsFirebaseFirebaseConfig = {
  apiKey: "AIzaSyDs0P3cNbVIwNfYr-0bdk30WgsVUA7wcjg",
  databaseURL:
    "https://foot2gether-default-rtdb.europe-west1.firebasedatabase.app/",
};

var videoRoomsFirebase = firebase.initializeApp(
  videoRoomsFirebaseFirebaseConfig,
  "other"
);

export const db = videoRoomsFirebase;

export default videoRoomsFirebase;
