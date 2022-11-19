import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

const ProtectedRout = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const [hasAccess, setHasAccess] = useState(false);
  const token = useLocalStorage();

  useEffect(() => {
    console.log("ProtectedRoute");
    console.log(token === null);

    setHasAccess(token !== null);
  }, []);

  return hasAccess === true ? <Outlet /> : <a href="/login">Pease login</a> ;
};

export default ProtectedRout;
