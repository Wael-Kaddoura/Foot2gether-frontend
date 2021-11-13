import firebase from "firebase";

var videoRoomsFirebaseFirebaseConfig = {
  apiKey: "AIzaSyCqpSTVgPg90TWphuvn9joXvUpS9V--zbA",
  databaseURL:
    "https://foot2gether-virtual-rooms-default-rtdb.europe-west1.firebasedatabase.app/",
};

var videoRoomsFirebase = firebase.initializeApp(
  videoRoomsFirebaseFirebaseConfig,
  "other"
);

export const db = videoRoomsFirebase;

export default videoRoomsFirebase;
