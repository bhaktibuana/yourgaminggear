import React from "react";
import Navbar from "../../components/admin/navbar";
import RightSidebar from "../../components/admin/rightSidebar";
import Sidebar from "../../components/admin/sidebar";

import "./style.scss";

const Dashboard = (props) => {
  return (
    <>
      <div className={props.appState.isExpand ? "dashboard-expand" : "dashboard"}>
        <RightSidebar pageName="dashboard" appState={props.appState} />
        <Navbar pageName="Dashboard" appState={props.appState} />
        
        <div className="dashboard-container">
          <h1>Dashboard Page</h1>
        </div>
      </div>
      <Sidebar pageName="dashboard" appState={props.appState} />
    </>
  );
};

export default Dashboard;
