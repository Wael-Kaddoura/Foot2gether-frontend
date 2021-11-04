import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useHistory } from "react-router-dom";

import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import UserNavBar from "../../components/NavBar/UserNavBar";
import MyProfileNavbarContent from "../../components/User/MyProfileNavbarContent";
import UserInfo from "../../components/NavBar/UserInfo";
import UserProfileTabs from "../../components/User/UserProfileTabs";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

function MyProfile() {
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push("/login");
  }

  const token = login_status.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  let user_data = JSON.parse(localStorage.getItem("login"));

  const { username, user_profile_picture, user_cover_photo, user_bio } =
    login_status;

  const [isPending, setIsPending] = useState(true);
  const [myProfileData, setMyProfileData] = useState(null);
  const [postError, setPostError] = useState(null);

  const { data: myLiveRooms, isPending: isRoomsPending } = useAxiosFetch(
    getAPIBaseURL() + "/room/my_rooms"
  );

  const { data: myBlogs, isPending: isBlogsPending } = useAxiosFetch(
    getAPIBaseURL() + "/blog/my_blogs"
  );

  async function getMyProfileData() {
    try {
      let response = await axios.get(
        getAPIBaseURL() + `/user/my_profile`,
        config
      );
      let my_profile_data = response.data;
      setMyProfileData(my_profile_data);
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getMyProfileData();
  }, []);

  async function changeProfilePicture(formData) {
    setIsPending(true);
    try {
      const response = await axios.post(
        getAPIBaseURL() + "/user/change_profile_picture",
        formData,
        config
      );

      if (response.status === 200) {
        user_data.user_profile_picture = response.data;
        localStorage.setItem("login", JSON.stringify(user_data));

        getMyProfileData();
        setPostError(null);
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setPostError(err.message);
      setIsPending(false);
    }
  }

  async function changeCoverPhoto(formData) {
    setIsPending(true);
    try {
      const response = await axios.post(
        getAPIBaseURL() + "/user/change_cover_photo",
        formData,
        config
      );

      if (response.status === 200) {
        user_data.user_cover_photo = response.data;
        localStorage.setItem("login", JSON.stringify(user_data));

        getMyProfileData();
        setPostError(null);
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setPostError(err.message);
      setIsPending(false);
    }
  }

  async function changeBio(data) {
    setIsPending(true);
    try {
      let response = await axios.post(
        getAPIBaseURL() + "/user/change_bio",
        data,
        config
      );

      if (response.status === 200) {
        user_data.user_bio = response.data;
        localStorage.setItem("login", JSON.stringify(user_data));

        getMyProfileData();
        setPostError(null);
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setPostError(err.message);
      setIsPending(false);
    }
  }

  return (
    <div>
      <BackdropComponent open={isPending || isRoomsPending || isBlogsPending} />

      {postError && <Alert severity="error">{postError}</Alert>}

      {!isPending && !isRoomsPending && !isBlogsPending && (
        <div style={{ backgroundColor: "#1a1e25 " }}>
          <UserNavBar coverPhoto={user_cover_photo}>
            <MyProfileNavbarContent
              myProfileData={myProfileData}
              getMyProfileData={getMyProfileData}
              changeProfilePicture={changeProfilePicture}
              changeCoverPhoto={changeCoverPhoto}
              username={username}
              userProfilePicture={user_profile_picture}
            />
          </UserNavBar>

          <UserInfo
            bio={user_bio}
            followingCount={myProfileData.following.length}
            followersCount={myProfileData.follower.length}
            getMyProfileData={getMyProfileData}
            isMyProfile={true}
            changeBio={changeBio}
          />

          <UserProfileTabs
            username={myProfileData.username}
            userLiveRooms={myLiveRooms}
            userBlogs={myBlogs}
          />

          <Footer />
        </div>
      )}
    </div>
  );
}

export default MyProfile;
