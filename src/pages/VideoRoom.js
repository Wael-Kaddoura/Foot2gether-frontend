import { Provider } from "react-redux";
import Room from "../components/VideoRooms/Room";
import store from "../store/createStore";
import firepadRef from "../server/firebase-videoRooms/getFirebaseRef";

function VideoRoom() {
  const userName = prompt("What's your name?");

  return (
    <Provider store={store}>
      <Room firepadRef={firepadRef} userName={userName} />
    </Provider>
  );
}

export default VideoRoom;
