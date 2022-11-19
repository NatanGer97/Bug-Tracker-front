import React, { useEffect, useRef, useState, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";
import { useFormAction, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const LOGIN_URL = "/auth/login";

const Login = () => {
  // const { setAuth } = useContext(AuthContext);
  const { setAuth, setIsLogin, isLogin} = useAuth();
  

 

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // if user already login -> redirect automatically
  useEffect(()=>
  {
    if (isLogin) {
      navigate('/home');

    }
  },[])
  // on first render
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // empty out errors
  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const setTokenToLocalStorage = (token) =>
  {
    localStorage.setItem('token', token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data.roles;
      setSuccess(true);
      setAuth({ user, password, roles, accessToken });
      setIsLogin(true);
      setTokenToLocalStorage(accessToken);
      
      setUser("");
      setErrMsg("");
      navigate('/home', {replace: true});
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="/home">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
