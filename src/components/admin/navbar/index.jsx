import React, { useState, useEffect } from "react";
import { MdList, MdOutlineMoreVert, MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

import "./style.scss";

const Navbar = (props) => {
  const [navbarClass, setNavbarClass] = useState("admin-navbar");

  const navigate = useNavigate();

  const rightSidebarHandler = () => {
    props.appState.setShowRightSidebar(!props.appState.showRightSidebar);
  };

  const dropdownItemHandler = (path) => {
    navigate(path);
  };

  const listenScrollEvent = () => {
    if (window.scrollY < 1) {
      return setNavbarClass("admin-navbar");
    } else {
      return setNavbarClass("admin-navbar-scroll");
    }
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
            <button
              className="expand-icon"
              onClick={() =>
                props.appState.setIsExpand(!props.appState.isExpand)
              }
            >
              {props.appState.isExpand ? (
                <MdOutlineMoreVert size={22} />
              ) : (
                <MdList size={22} />
              )}
            </button>

            <p>{props.pageName}</p>
          </div>

          <div className="item-right">
            <p>{props.userAuthData.name}</p>

            <div className="profile-container">
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
                    <button onClick={() => dropdownItemHandler("/account")}>
                      Account Setting
                    </button>
                  </li>

                  <li>
                    <button onClick={() => handleLogout()}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>

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
