import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useDecodedToken from "../../hooks/useDecodedToken";
import useLocalStorage from "../../hooks/useLocalStorage";
import jwt_decoded from "jwt-decode";
import user from "../../assets/user_avatar.png";
import "./Home.css";
const Home = () => {
  const [name, setName] = useState();
  const [roles, setRoles] = useState([]);
  const token = useLocalStorage();

  useEffect(() => {
    const decodedToken = jwt_decoded(token);
    setName(decodedToken.UserInfo.userName);
    setRoles(decodedToken.UserInfo.roles);
  }, []);

  return (
    <main>
      <div className="container py-4 ">
        <div className="row">
          <div className="p-5 mb-4 bg-light rounded-3 shadow">
            <div className="container-fluid py-5">
              <div className="container text-center">
                <div className="row row-cols-3 g-2 user-section">
                  <div className="col-mb-6  ">
                    <img
                      src={user}
                      alt="user_pic"
                      className="img-fluid user-img float-start"
                    />
                  </div>
                  <div className="col-mb-6 ">
                    <h1 className="display-5 fw-bold">{name}</h1>
                    <p>
                      <span>Roles: </span>
                      <span>{Array.from(roles).join(" & ")}</span>
                      {/*  <ul>
                    {Array.from(roles).map((role)=> <li>{role}</li>)}
                    </ul> */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

       
          <div className="row align-items-md-stretch ">
            <div className="col-md-6">
              <div className="h-100 p-5 text-bg-dark rounded-3 shadow">
                <h2>Missions</h2>
                <p>will show all undone missions</p>
                <button className="btn btn-outline-light" type="button">
                  Show
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <div className="h-100 p-5 bg-light border rounded-3 shadow">
                <h2>Bugs</h2>
                <p>will show all fixes or lasted bug</p>
                <button className="btn btn-outline-secondary" type="button">
                  Show
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="p-4">
              <div className="h-100 p-5 bg-light border rounded-3 shadow">
                <h2>Team</h2>
                <p>will show all team member</p>
                <button className="btn btn-outline-secondary" type="button">
                  Show
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
