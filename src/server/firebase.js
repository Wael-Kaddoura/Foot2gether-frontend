import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDs0P3cNbVIwNfYr-0bdk30WgsVUA7wcjg",
  databaseURL:
    "https://foot2gether-default-rtdb.europe-west1.firebasedatabase.app/",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase;

var firepadRef = firebase.database().ref();

export function Kosa() {
  const userName = prompt("What's your name?");
  const urlparams = new URLSearchParams(window.location.search);
  const roomId = urlparams.get("id");

  if (roomId) {
    firepadRef = firepadRef.child(roomId);
  } else {
    firepadRef = firepadRef.push();
    window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
  }

  return userName;
}

export default firepadRef;
