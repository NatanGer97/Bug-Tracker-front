import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import AuthService from "../../../Services/AuthService";

const SignOutBtn = () => {
  const navigate = useNavigate();
   const {setIsLogin} = useAuth();
    

  const signOut = () => {
    AuthService.SignOut();
    setIsLogin(false);
    
    navigate('/login', {replace:true});
  };
  return (
    <button
      className="btn btn-sm btn-outline-primary mx-2  "
      href="/sign-out"
      onClick={signOut}
    >
      <i className="fa-solid fa-right-from-bracket fa-sm">
        <span> Sign out</span>
      </i>
    </button>
  );
};

export default SignOutBtn;
