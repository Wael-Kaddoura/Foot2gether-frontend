import Overlay from "../components/NavBar/Overlay";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import getAPIBaseURL from "../APIBaseURL";
import axios from "axios";
import useAxiosFetch from "../hooks/useAxiosFetch";
import SignupForm from "../components/User/SignupForm";

function Signup() {
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

  const [favTeam, setFavTeam] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signUpError, setSignUpError] = useState(false);
  const [emailUsedError, setEmailUsedError] = useState(false);
  const [usernameUsedError, setUsernameUsedError] = useState(false);

  const { data: teamsData, isPending } = useAxiosFetch(
    getAPIBaseURL() + "/team"
  );

  const handleChange = (event) => {
    setFavTeam(event.target.value);
  };

  const handleSubmit = async (event) => {
    setPasswordMatch(true);
    setEmailUsedError(false);
    setUsernameUsedError(false);

    event.preventDefault();
    const signup_data = new FormData(event.currentTarget);
    const username = signup_data.get("username");
    const email = signup_data.get("email");
    const password = signup_data.get("password");
    const confirm_password = signup_data.get("confirm_password");
    const fav_team_id = favTeam;
    const gender = signup_data.get("gender");

    if (password !== confirm_password) {
      setPasswordMatch(false);
    } else {
      const data = {
        username,
        email,
        password,
        confirm_password,
        fav_team_id,
        gender,
      };

      try {
        let response = await axios.post(getAPIBaseURL() + "/user/signup", data);

        if (response.status === 201) {
          setSignUpError(false);
          history.push({
            pathname: "/login",
            state: {
              new_account_created: true,
            },
          });
        } else {
          console.log("Something went wrong!");
          setSignUpError(true);
        }
      } catch (err) {
        if (err.response.status === 401) {
          console.log("Something went wrong!");
          setSignUpError(true);
        } else if (err.response.status === 409) {
          let conflict_type = err.response.data.conflict;
          if (conflict_type === "Email") {
            setEmailUsedError(true);
          } else if (conflict_type === "Username") {
            setUsernameUsedError(true);
          }
        }
        console.log(err);
      }
    }
  };

  return (
    <Overlay>
      <SignupForm
        signUpError={signUpError}
        setSignUpError={setSignUpError}
        emailUsedError={emailUsedError}
        setEmailUsedError={setEmailUsedError}
        usernameUsedError={usernameUsedError}
        setUsernameUsedError={setUsernameUsedError}
        passwordMatch={passwordMatch}
        favTeam={favTeam}
        teamsData={teamsData}
        isPending={isPending}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Overlay>
  );
}

export default Signup;
