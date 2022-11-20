import { useEffect } from "react";

import useAuth from "../../hooks/useAuth";
import AuthButtons from "./components/AuthButtons";
import BrandTitle from "./components/BrandTitle";
import NavbarLinks from "./components/NavbarLinks";
import SignOutBtn from "./components/SignOutBtn";
import "./Navbar.css";
import DropdownNavbar from "./components/Dropdown/DropdownNavbar";

function OffcanvasNavbar() {
  const { isLogin } = useAuth();
  useEffect(() => {
    console.log("navbar rendered");
    console.log("is login changed");
  }, [isLogin]);

  return (
    <nav className="navbar  navbar-expand-lg shadow-sm ">
      <div className="container">
        {/* Toggle button  */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* collapsing area */}
        <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
          <BrandTitle title="Brand" />
          {isLogin && <NavbarLinks />}
          {/* {isLogin === true ? <SignOutBtn /> : <AuthButtons />} */}
          {isLogin === true && <DropdownNavbar userName ={'username'}/>}
         
        </div>
      </div>
    </nav>
  );
}

export default OffcanvasNavbar;
