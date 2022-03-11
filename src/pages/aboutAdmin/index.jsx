import React from "react";
import Navbar from "../../components/admin/navbar";
import RightSidebar from "../../components/admin/rightSidebar";
import Sidebar from "../../components/admin/sidebar";

import "./style.scss";

const AboutAdmin = (props) => {
  return (
    <>
      <div className={props.appState.isExpand ? "about-admin-expand" : "about-admin"}>
        <RightSidebar pageName="aboutAdmin" appState={props.appState} />
        <Navbar pageName="About" appState={props.appState} />

        <div className="about-admin-container">
          <h1>About Page</h1>
        </div>
      </div>
      <Sidebar pageName="aboutAdmin" appState={props.appState} />
    </>
  );
};

export default AboutAdmin;
