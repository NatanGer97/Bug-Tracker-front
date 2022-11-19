import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import useAuth from "../../hooks/useAuth";
import AuthButtons from "./components/AuthButtons";
import BrandTitle from "./components/BrandTitle";
import NavbarLinks from "./components/NavbarLinks";
import SignOutBtn from "./components/SignOutBtn";
import Dropdown from "react-bootstrap/Dropdown";

import "./Navbar.css";

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
          {isLogin === true ? <SignOutBtn /> : <AuthButtons />}
          <div className="btn-group">
            {/* <button className=" btn dropdown-toggle">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                class="rounded-circle"
                style={{width: '150px'}}
              />
            </button> */}
              <button
              className="btn btn-sm  mx-2 dropdown-toggle"
              type="button"
              id="Dropdown"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded="false"
            >
               <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle "
                style={{width: '50px'}}
              />
           
            </button>
            <ul className="dropdown-menu" aria-labelledby="Dropdown">
              <li>
                <a className="dropdown-item" href="#">
                  Menu item
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Menu item
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Menu item
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default OffcanvasNavbar;
