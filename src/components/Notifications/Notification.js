import { useEffect } from "react";
import firebase from "../../server/firebase-notifications/firebase";

function Notification() {
  useEffect(() => {
    const msg = firebase.messaging();
    msg
      .requestPermission()
      .then(() => {
        return msg.getToken();
      })
      .then((data) => {
        console.log("token", data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return <div></div>;
}

export default Notification;
