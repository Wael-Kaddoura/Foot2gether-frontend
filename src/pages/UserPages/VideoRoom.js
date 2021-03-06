import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";
import VideoRoomConnection from "../../components/VideoRooms/VideoRoom";

function VideoRoom() {
  const history = useHistory();

  //check user login status
  let config = "";
  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push({
      pathname: "/login",
      state: {
        need_login_first: true,
      },
    });
  } else {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  }

  const room_id = new URLSearchParams(useLocation().search).get("id");

  const [isLoaded, setIsLoaded] = useState(false);
  const [isRoomLive, setIsRoomLive] = useState(false);
  const [myProfileData, setMyProfileData] = useState(null);

  async function roomStatusCheck() {
    if (room_id) {
      try {
        let response = await axios.get(
          getAPIBaseURL() + `/room/check_if_live/` + room_id,
          config
        );
        let room_live_status = response.data;

        if (room_live_status) {
          setIsRoomLive(room_live_status);
        } else {
          history.push("/rooms");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      history.push("/rooms");
    }
  }

  async function getMyProfileData() {
    try {
      let response = await axios.get(
        getAPIBaseURL() + `/user/my_profile`,
        config
      );
      let my_profile_data = response.data;
      setMyProfileData(my_profile_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await roomStatusCheck();
    await getMyProfileData();
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoaded ? (
        isRoomLive ? (
          <VideoRoomConnection
            userName={myProfileData.username}
            roomID={room_id}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default VideoRoom;
