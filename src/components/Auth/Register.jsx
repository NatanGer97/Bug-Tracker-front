import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const EMAIL_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userEmailRef = useRef();
  const userPasswordRef = useRef();
  const userNameRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [validUserEmail, setValidUserEmail] = useState(false);

  const [userPassword, setUserPassword] = useState("");
  const [validUserPassword, setValidUserPassword] = useState(false);

  const [userName, setUserName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [validForm, setValidForm] = useState(false);

  const emailValidation = () => {
    setValidUserEmail(userEmail.includes("@"));
  };

  const passwordValidation = () => {
    setValidUserPassword(userPassword.length > 3);
  };

  const onChangePassword = (event) => {
    event.preventDefault();
    const password = event.target.value;
    setValidUserPassword(password.length > 3);
    setUserPassword(password);
  };

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidForm(validUserEmail && validUserPassword && userName.length > 0);
    setErrorMessage("");
  }, [validUserEmail, userName, validUserPassword]);

  const registerSubmitHandle = async (event) => {
    event.preventDefault();

    if (!validUserEmail || !validUserPassword) {
      setErrorMessage("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: userEmail,
          name: userName,
          password: userPassword,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      setUserEmail("");
      setUserPassword("");
      setUserName("");
      setErrorMessage("");

      // navigate to activation page
      const userId = response.data.userId;
    //   const userId = JSON.stringify(response.data.userId);
      alert(userId)
      navigate(`/activate`, {state: {userId: userId}});
    
    
    } catch (err) {
      if (!err?.response) {
        setErrorMessage("No Server Response");
      } else if (err.response?.status === 409) {
        setErrorMessage("Email Taken");
      } else {
        setErrorMessage("Registration Failed");
      }

      errRef.current.focus();
    } finally {
      // setErrorMessage("");
    }
  };

  return (
    <>
      <div className="container pt-5 main-div">
        <form
          className="login-form text-center shadow my-4"
          onSubmit={registerSubmitHandle}
        >
          <p
            ref={errRef}
            className={errorMessage ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <h1 className="text-center">Register</h1>
          <div className="mb-3">
            <label htmlFor="name" class="form-label">
              Name
            </label>
            <input
              type={"text"}
              ref={userNameRef}
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
              className="form-control"
              id="name"
              onBlur={passwordValidation}
            />
            {/* <p hidden={validUserPassword}>Password Invalid</p> */}
          </div>
          <div className="mb-3">
            <label htmlFor="email" class="form-label">
              Email address
            </label>
            <input
              type="email"
              ref={userEmailRef}
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              required
              className="form-control"
              id="email"
              onBlur={emailValidation}
            />
            <p hidden={validUserEmail}>Email Invalid</p>
          </div>

          <div className="mb-3">
            <label htmlFor="password" class="form-label">
              Password
            </label>
            <input
              type={"password"}
              ref={userPasswordRef}
              //   onChange={onChangePassword}
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
              required
              className="form-control"
              id="password"
              onBlur={passwordValidation}
            />
            <p hidden={validUserPassword}>Password Invalid</p>
          </div>

          <button disabled={!validForm}>Register</button>
        </form>
      </div>
    </>
  );
};
export default Register;
