import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

import useLocalStorage from "../hooks/useLocalStorage";

const RequireAuthorization = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  const [isAuthorized, setIsAuthorized] = useState(false)
  const decodedTokenInfo = jwt_decode(useLocalStorage());
  useEffect(() => {
  console.log(decodedTokenInfo.UserInfo.roles);
    for (let i = 0; i < Array.from(allowedRoles).length; i++) {
      if (Array.from(decodedTokenInfo.UserInfo.roles).includes(allowedRoles[i])) {
        setIsAuthorized(Array.from(decodedTokenInfo.UserInfo.roles).includes(allowedRoles[i]));
        console.log(Array.from(decodedTokenInfo.UserInfo.roles).includes(allowedRoles[i]));
        break;
      }

   /*  if (auth) {
      if (auth.roles) {
        for (let i = 0; i < Array.from(allowedRoles).length; i++) {
          if (Array.from(auth.roles).includes(allowedRoles[i])) {
            isAuthorized = true;
            console.log(isAuthorized);
            break;
          }
        }
      }
    } */
  }}, []);


  return isAuthorized === true ? <Outlet /> :  <div>unauthorized <a href="/home"> GO Back</a></div>;
  // return isAuthorized === true ? (<Outlet />) : (<Navigate to="/unauthorized"  />);

  // return isAuthorized === true ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/unauthorized" state={{ from: location }} replace />
  // );
  /* isAuthorized === true ? (<Outlet />) : auth?.user ? (<Navigate to="/unauthorized" state={{ from: location }} replace />) : (
      <Navigate to="/login" state={{ from: location }} replace />
    ) */
};

export default RequireAuthorization;
