import { useState } from "react";
import Overlay from "../components/NavBar/Overlay";
import { useHistory } from "react-router-dom";
import { isIOS } from "react-device-detect";
import getAPIBaseURL from "../APIBaseURL";
import axios from "axios";
import firebase from "../server/firebase-notifications/firebase";
import LoginForm from "../components/User/LoginForm";
import BackdropComponent from "../components/BackdropComponent";

function Login(props) {
  const history = useHistory();

  //check if user already logged in
  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status && login_status.login) {
    if (login_status.is_admin) {
      history.push("/admin/home");
    } else {
      history.push("/");
    }
  }

  //checking if the user is redirected to the login page after creating a new account, in order to display a msg
  const is_new_account_created_msg =
    history.location.state && history.location.state.new_account_created
      ? true
      : false;

  //checking if the user is directed to the login page after trying to access pages without logging in, in order to display a msg
  const is_need_login_first_msg =
    history.location.state && history.location.state.need_login_first
      ? true
      : false;

  const [isPending, setIsPending] = useState(false);
  const [loginError, setLoginError] = useState(false);

  async function saveNotificationToken(notification_token) {
    try {
      const token = JSON.parse(localStorage.getItem("login")).token;
      let config = { headers: { Authorization: `Bearer ${token}` } };

      let response = await axios.post(
        getAPIBaseURL() + "/user/save_notification_token",
        { notification_token },
        config
      );
      if (response.status === 200) {
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getNotificationToken() {
    const messaging = firebase.messaging();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./firebase-messaging-sw.js")
        .then(function (registration) {
          Notification.requestPermission().then(() => {
            messaging
              .getToken({
                vapidKey:
                  "BE79LYKRbGr6Awn6AzLkyJ6uXG6MEvb6mlLHfm6a4AY6jB1y0KmdnDGRZ5Mya_akjv6nBkzkCJecd2Sl054Nurg",
                serviceWorkerRegistration: registration,
              })
              .then((currentToken) => {
                if (currentToken) {
                  saveNotificationToken(currentToken);
                } else {
                  console.log(
                    "No registration token available. Request permission to generate one."
                  );
                }
              })
              .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
              });
          });
        })
        .catch(function (err) {
          console.log("Service worker registration failed, error:", err);
        });
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsPending(true);

    const login_data = new FormData(event.currentTarget);
    const email = login_data.get("email");
    const password = login_data.get("password");

    try {
      const response = await axios.post(getAPIBaseURL() + "/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const JWT_token = response.data.token;
        const is_admin = response.data.isAdmin;
        const {
          user_id,
          username,
          user_profile_picture,
          user_cover_photo,
          user_bio,
        } = response.data.user;

        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            token: JWT_token,
            is_admin,
            user_id,
            username,
            user_profile_picture,
            user_cover_photo,
            user_bio,
          })
        );

        setLoginError(false);

        if (is_admin) {
          history.push("/admin/home");
        } else {
          //if user is using IOS device, the Firebase Notification Token won't be fetched to prevent errors
          if (!isIOS) {
            await getNotificationToken();
          }
          history.push("/");
        }
      } else {
        console.log("Something went wrong!");
        setIsPending(false);
        setLoginError(true);
      }
    } catch (err) {
      if (err) {
        if (err.response && err.response.status === 401) {
          console.log("Wrong Credentials!");
        }
        console.log(err);
      }
      setIsPending(false);
      setLoginError(true);
    }
  };

  return (
    <div>
      <BackdropComponent open={isPending} />
      <Overlay>
        <LoginForm
          isNewAccountCreatedMsg={is_new_account_created_msg}
          isNeedLoginFirstMsg={is_need_login_first_msg}
          loginError={loginError}
          handleSubmit={handleSubmit}
        />
      </Overlay>
    </div>
  );
}

export default Login;
