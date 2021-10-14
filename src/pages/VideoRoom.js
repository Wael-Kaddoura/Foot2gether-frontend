import Room from "../components/VideoRooms/Room";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { userReducer } from "../store/reducer";

export const store = createStore(userReducer);

function VideoRoom() {
  return (
    <Provider store={store}>
      <Room />
    </Provider>
  );
}

export default VideoRoom;
