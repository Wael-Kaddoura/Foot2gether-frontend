import { Provider } from "react-redux";
import Room from "./Room";
import store from "../../store/createStore";
import videoRoomsFirebase from "../../server/firebase-videoRooms/firebase";

function VideoRoom({ userName, roomID }) {
  let firepadRef = videoRoomsFirebase.database().ref().child(roomID);

  return (
    <Provider store={store}>
      <Room firepadRef={firepadRef} userName={userName} />
    </Provider>
  );
}

export default VideoRoom;
