import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useLocation, useHistory } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import UserNavBar from "../../components/NavBar/UserNavBar";
import UserProfileNavbarContent from "../../components/User/UserProfileNavbarContent";
import UserInfo from "../../components/NavBar/UserInfo";
import UserProfileTabs from "../../components/User/UserProfileTabs";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

function UserProfile() {
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push("/login");
  }

  const token = login_status.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const my_id = login_status.user_id;

  const user_id = new URLSearchParams(useLocation().search).get("id");

  if (my_id == user_id) {
    history.push("/my_profile");
  }

  const [isPending, setIsPending] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [postError, setPostError] = useState(null);

  const { data: userLiveRooms, isPending: isRoomsPending } = useAxiosFetch(
    getAPIBaseURL() + "/room/user/" + user_id
  );

  const { data: userBlogs, isPending: isBlogsPending } = useAxiosFetch(
    getAPIBaseURL() + "/blog/user/" + user_id
  );

  async function getUserData() {
    try {
      let response = await axios.get(
        getAPIBaseURL() + `/user/` + user_id,
        config
      );
      let user_data = response.data.user_data;
      let is_followed = response.data.is_followed;

      setUserData(user_data);
      setIsFollowed(is_followed);
    } catch (error) {
      console.log(error);
    }
  }

  async function followUser() {
    try {
      await axios.post(
        getAPIBaseURL() + `/user/follow`,
        { followed_user_id: user_id },
        config
      );

      await getUserData();
      setPostError(null);
      setIsFollowed(true);
    } catch (err) {
      console.log(err);
      setPostError(err.message);
    }
  }

  async function unFollowUser() {
    try {
      await axios.post(
        getAPIBaseURL() + `/user/unfollow`,
        { unfollowed_user_id: user_id },
        config
      );

      await getUserData();
      setPostError(null);
      setIsFollowed(false);
    } catch (err) {
      console.log(err);
      setPostError(err.message);
    }
  }

  async function fetchData() {
    await getUserData();
    setIsPending(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div>
      <BackdropComponent open={isPending || isRoomsPending || isBlogsPending} />

      {postError && <Alert severity="error">{postError}</Alert>}

      {!isPending && !isRoomsPending && !isBlogsPending && (
        <div style={{ backgroundColor: "#1a1e25 " }}>
          <UserNavBar coverPhoto={userData.cover_photo}>
            <UserProfileNavbarContent
              userData={userData}
              followUser={followUser}
              unFollowUser={unFollowUser}
              isFollowed={isFollowed}
            />
          </UserNavBar>

          <UserInfo
            followingCount={userData.following.length}
            followersCount={userData.follower.length}
            bio={userData.bio}
          />

          <UserProfileTabs
            username={userData.username}
            userLiveRooms={userLiveRooms}
            userBlogs={userBlogs}
          />

          <Footer />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
