import videoRoomsFirebase from "./firebase";

const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

if (roomId) {
  var firepadRef = videoRoomsFirebase.database().ref().child(roomId);
} else {
  var firepadRef = videoRoomsFirebase.database().ref();
}

export default firepadRef;
