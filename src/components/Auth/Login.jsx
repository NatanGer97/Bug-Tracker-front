import "./Login.css";
import React, {
  useEffect,
  useRef,
  useState,
  Fragment,
} from "react";
import {  useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const { setAuth, setIsLogin, isLogin,setUsername } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // if user already login -> redirect automatically
  useEffect(() => {
    if (isLogin) {
      navigate("/home");
    }
  }, []);

    // on first render
    useEffect(() => {
        userRef.current.focus();
      }, []);
    
      // empty out errors
      useEffect(() => {
        setErrMsg("");
        setLoading(false);
      }, [user, password]);

  const setTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
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
      if (response.status === 200) {
        const accessToken =  await response?.data?.accessToken;
        const roles = await response?.data.roles;
        const name = await response.data.username;
        setSuccess(true);
        setAuth({ user, password, roles, accessToken });
        setIsLogin(true);
        setUsername(name);
        setTokenToLocalStorage(accessToken);
  
        setUser("");
        setErrMsg("");
        navigate("/home", { replace: true });
      }
      else {throw response}
     
   
    } catch (err) {
      const errMsg = JSON.stringify(err.response.data.message);
      alert(errMsg);
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg(`Unauthorized ${errMsg}`);
      } else {
        setErrMsg("Login Failed ");
      }
      errRef.current.focus();
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <Fragment>
      {!success ? (
        <div className="container pt-5 main-div">
          <form
            className="login-form text-center shadow my-4"
            onSubmit={handleSubmit}
          >
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="text-center">Login</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label htmlFor="password" 
              className="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
            <br />
            <a href="/register">Create Account</a>

          </form>
          
        </div>
        
      ) : (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="/home">Go to Home</a>
          </p>
        </section>
      )}
    </Fragment>
  );
};

export default Login;
