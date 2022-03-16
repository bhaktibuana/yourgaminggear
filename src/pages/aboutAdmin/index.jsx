import React from "react";
import Footer from "../../components/admin/footer";
import Navbar from "../../components/admin/navbar";
import RightSidebar from "../../components/admin/rightSidebar";
import Sidebar from "../../components/admin/sidebar";

import "./style.scss";

const AboutAdmin = (props) => {
  return (
    <>
      <div
        className={
          props.appState.isExpand ? "about-admin-expand" : "about-admin"
        }
      >
        <RightSidebar pageName="aboutAdmin" appState={props.appState} />
        <Navbar pageName="About" appState={props.appState} />

        <div className="about-admin-root">
          <div className="about-admin-container">
            <div className="about-card">
              <div className="about-card-banner">
                <img
                  src={require("../../assets/img/about-bg.png")}
                  alt="about-banner"
                />
              </div>

              <img
                src={require("../../assets/logo/round-logo.png")}
                alt="about-logo"
                className="card-logo"
              />

              <div className="about-card-content">
                <div className="description">
                  <p>
                    <strong>Your Gaming Gear</strong> is a 3rd mini-project from
                    Dibimbing course FWD4 by Bhakti Mega Buana in the form of an
                    e-commerce website application that sales gaming gear
                    products. This website was created using a framework called{" "}
                    <a
                      href="https://reactjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ReactJs
                    </a>{" "}
                    as the client side and a framework called{" "}
                    <a
                      href="https://expressjs.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ExpressJs
                    </a>{" "}
                    as the server side. On the front-end, the display is
                    structured with{" "}
                    <a
                      href="https://sass-lang.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SASS
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://ant.design"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ant Design
                    </a>{" "}
                    so that the display becomes attractive and responsive and
                    uses JavaScript to make the display more interactive for the
                    user.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
      <Sidebar pageName="aboutAdmin" appState={props.appState} />
    </>
  );
};

export default AboutAdmin;
