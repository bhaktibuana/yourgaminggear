import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

import "./style.scss";
import {
  MdDashboard,
  MdImage,
  MdInfo,
  MdLogin,
  MdLogout,
  MdManageAccounts,
  MdOutlineArrowDropDown,
} from "react-icons/md";

const Sidebar = (props) => {
  const [isProfileExpand, setIsProfileExpand] = useState(false);

  const navigate = useNavigate();

  const rightSidebarHandler = () => {
    props.appState.setShowRightSidebar(!props.appState.showRightSidebar);
  };

  const rightSidebarStyle = {
    left: props.appState.showRightSidebar ? "0" : "-300%",
  };

  const darkScreenStyle = {
    display: props.appState.showRightSidebar ? "flex" : "none",
    opacity: props.appState.showRightSidebar ? "1" : "0",
  };

  const rightSidebarContainerStyle = {
    right: props.appState.showRightSidebar ? "0" : "-300px",
  };

  const iconProfileStyle = {
    transform: isProfileExpand ? "rotate(180deg)" : "rotate(0deg)",
  };

  const btnLogoutStyle = {
    display: isProfileExpand ? "flex" : "none",
    opacity: isProfileExpand ? 1 : 0,
  };

  const profileHandler = () => {
    setIsProfileExpand(!isProfileExpand);
  };

  const itemHandler = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  return (
    <>
      <div className="sidebar" style={rightSidebarStyle}>
        <div
          className="dark-screen"
          onClick={rightSidebarHandler}
          style={darkScreenStyle}
        ></div>

        <div className="sidebar-container" style={rightSidebarContainerStyle}>
          <div className="title-container">
            <a href="/" className="title">
              <img
                className="title-img"
                src={require("../../assets/logo/logo-white-small.png")}
                alt=""
              />

              <h1>Your Gaming Gear</h1>
            </a>
          </div>

          <div className="sidebar-line"></div>

          {localStorage.getItem("access_token") ? (
            <>
              <div className="profile-container">
                <button className="profile" onClick={profileHandler}>
                  {props.userAuthData.image_url ? (
                    <img src={props.userAuthData.image_url} alt="profile" />
                  ) : (
                    <Spin />
                  )}

                  <div className="profile-text">
                    <p>{props.userAuthData.name}</p>

                    <div className="arrow-icon" style={iconProfileStyle}>
                      <MdOutlineArrowDropDown size={24} />
                    </div>
                  </div>
                </button>

                <button
                  className="logout"
                  style={btnLogoutStyle}
                  onClick={() => itemHandler("/dashboard")}
                >
                  <div className="icon-logout">
                    <MdDashboard size={24} />
                  </div>

                  <p>Dashboard</p>
                </button>

                <button
                  className="logout"
                  style={btnLogoutStyle}
                  onClick={() => itemHandler("/account")}
                >
                  <div className="icon-logout">
                    <MdManageAccounts size={24} />
                  </div>

                  <p>Account Setting</p>
                </button>

                <button
                  className="logout"
                  style={btnLogoutStyle}
                  onClick={handleLogout}
                >
                  <div className="icon-logout">
                    <MdLogout size={24} />
                  </div>

                  <p>Logout</p>
                </button>
              </div>

              <div className="sidebar-line"></div>
            </>
          ) : null}

          <div className="items-container">
            <button
              className={props.pageName === "catalog" ? "item-active" : "item"}
              onClick={() => itemHandler("/")}
            >
              <MdImage size={24} />
              <p>Home</p>
            </button>

            <button
              className={props.pageName === "about" ? "item-active" : "item"}
              onClick={() => itemHandler("/about")}
            >
              <MdInfo size={24} />
              <p>About</p>
            </button>

            {localStorage.getItem("access_token") ? null : (
              <button className="item" onClick={() => itemHandler("/login")}>
                <MdLogin size={24} />
                <p>Sign In</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
