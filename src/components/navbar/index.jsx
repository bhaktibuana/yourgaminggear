import React, { useState, useEffect } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

import "./style.scss";

const Navbar = (props) => {
  const [navbarClass, setNavbarClass] = useState("navbar");
  const [btnSignClass, setBtnSignClass] = useState("sign-in");

  const navigate = useNavigate();

  const listenScrollEvent = () => {
    if (window.scrollY < 1) {
      setNavbarClass("navbar");
      setBtnSignClass("sign-in");
    } else {
      setNavbarClass("navbar-scroll");
      setBtnSignClass("sign-in-scroll");
    }
  };

  const rightSidebarHandler = () => {
    props.appState.setShowRightSidebar(!props.appState.showRightSidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <>
      <div className={navbarClass}>
        <div className="navbar-container">
          <div className="item-left">
            <a href="/">
              <img
                src={require("../../assets/logo/logo-white-small.png")}
                alt=""
                className="logo"
              />

              <h1>Your Gaming Gear</h1>
            </a>
          </div>

          <div className="item-middle">
            <div className="button-container">
              <button
                className={
                  props.pageName === "catalog" ? "item-active" : "item"
                }
                onClick={() => navigate("/")}
              >
                Home
              </button>

              <button
                className={
                  props.pageName === "about" ? "item-active" : "item"
                }
                onClick={() => navigate("/about")}
              >
                About
              </button>
            </div>
          </div>

          <div className="item-right">
            {localStorage.getItem("access_token") ? (
              <div className="navbar-profile-container">
                <p>{props.userAuthData.name}</p>

                <div className="btn-profile-container">
                  <button className="profile-img">
                    {props.userAuthData.image_url ? (
                      <img src={props.userAuthData.image_url} alt="profile" />
                    ) : (
                      <Spin />
                    )}
                  </button>

                  <div className="profile-dropdown">
                    <ul>
                      <li>
                        <button onClick={() => navigate("/dashboard")}>
                          Dashboard
                        </button>
                      </li>

                      <li>
                        <button onClick={() => navigate("/account")}>
                          Account Setting
                        </button>
                      </li>

                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <button
                className={btnSignClass}
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            )}

            <button className="menu" onClick={rightSidebarHandler}>
              <MdOutlineMenu size={22} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
