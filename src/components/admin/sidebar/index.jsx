import React from "react";
import { MdDashboard, MdImage, MdManageAccounts, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const Sidebar = (props) => {
  const navigate = useNavigate();

  const itemHandler = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className={props.appState.isExpand ? "admin-sidebar-expand" : "admin-sidebar"}>
        <div className="title-container">
          <a href="/" className="title">
            <img
              className="title-img"
              src={require("../../../assets/logo/logo-white-small.png")}
              alt=""
            />

            <h1>Your Gaming Gear</h1>
          </a>
        </div>

        <div className="sidebar-line"></div>

        <div className="items-container">
          <button
            className={props.pageName === "dashboard" ? "item-active" : "item"}
            onClick={() => itemHandler("/dashboard")}
          >
            <MdDashboard size={24} />
            <p>Dashboard</p>
          </button>

          <button
            className={props.pageName === "catalog" ? "item-active" : "item"}
            onClick={() => itemHandler("/")}
          >
            <MdImage size={24} />
            <p>Catalog</p>
          </button>

          <button
            className={props.pageName === "account" ? "item-active" : "item"}
            onClick={() => itemHandler("/account")}
          >
            <MdManageAccounts size={24} />
            <p>Account Setting</p>
          </button>

          <button
            className={props.pageName === "aboutAdmin" ? "item-active" : "item"}
            onClick={() => itemHandler("/about-adm")}
          >
            <MdInfo size={24} />
            <p>About</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
