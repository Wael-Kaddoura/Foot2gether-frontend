import { useState } from "react";
import Overlay from "../components/NavBar/Overlay";
import { useHistory } from "react-router-dom";
import getAPIBaseURL from "../APIBaseURL";
import axios from "axios";
import firebase from "../server/firebase-notifications/firebase";
import LoginForm from "../components/User/LoginForm";
import BackdropComponent from "../components/BackdropComponent";

function Login() {
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
                  "BCTRcjpzvhCl8JaIKrvVWswLqauwLo8_1kyBSR68F1i2zjkmksoEw5YhqxlnIMdtlrpkDZRn6tTzS3arf6nB1fw",
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
    setIsPending(true);
    event.preventDefault();
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
          await getNotificationToken();
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
        <LoginForm handleSubmit={handleSubmit} loginError={loginError} />
      </Overlay>
    </div>
  );
}

export default Login;
