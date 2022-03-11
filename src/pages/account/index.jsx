import React from "react";
import Navbar from "../../components/admin/navbar";
import Sidebar from "../../components/admin/sidebar";
import RightSidebar from "../../components/admin/rightSidebar";

import "./style.scss";

const Account = (props) => {
  return (
    <>
      <div className={props.appState.isExpand ? "account-expand" : "account"}>
        <RightSidebar pageName="account" appState={props.appState} />
        <Navbar pageName="Account" appState={props.appState} />

        <div className="account-container">
          <h1>Account Setting Page</h1>
        </div>
      </div>
      <Sidebar pageName="account" appState={props.appState} />
    </>
  );
};

export default Account;
