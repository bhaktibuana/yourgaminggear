import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const Navbar = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="auth-navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="/">
              <img
                src={require("../../../assets/logo/logo-white-small.png")}
                alt="logo"
              />
              <p>Your Gaming Gear</p>
            </a>
          </div>

          <div className="navbar-button">
            <Button type="danger" onClick={() => navigate(props.path)}>{props.btnName}</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
