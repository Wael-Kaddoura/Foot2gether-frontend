import { Provider } from "react-redux";
import Room from "./Room";
import store from "../../store/createStore";
import firepadRef from "../../server/firebase-videoRooms/getFirebaseRef";

function VideoRoom({ userName }) {
  return (
    <Provider store={store}>
      <Room firepadRef={firepadRef} userName={userName} />
    </Provider>
  );
}

export default VideoRoom;
