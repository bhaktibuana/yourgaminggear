import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import axios from "axios";

import "./style.scss";

const About = (props) => {
  const [userAuthData, setUserAuthData] = useState({});

  const getUserData = async () => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      await axios
        .get(props.apiUrl.urlGetDataUserAuth, config)
        .then((res) => {
          setUserAuthData(res.data);
        })
        .catch((err) => {
          if (
            err.response.status === 401 &&
            err.response.data.message === "Token expired."
          ) {
            localStorage.removeItem("access_token");
            window.location.reload();
          }
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      getUserData();
    }
  }, []);

  return (
    <>
      <div className="about">
        <Sidebar
          pageName="about"
          userAuthData={userAuthData}
          appState={props.appState}
        />
        <Navbar
          pageName="about"
          userAuthData={userAuthData}
          appState={props.appState}
        />

        <div className="about-root">
          <div className="about-container">
            <div className="about-header">
              <div className="background-container">
                <img
                  src={require("../../assets/img/about-bg.png")}
                  alt="catalog-bg"
                />
              </div>

              <div className="title-container">
                <h1>Welcome to Your Gaming Gear</h1>
                <p>A place where you can get all the gaming gear you need</p>
              </div>
            </div>

            <div className="about-body">
              <div className="about-card-container">
                <div className="card-header">
                  <img
                    src={require("../../assets/img/profile-bg.png")}
                    alt="about-bg"
                  />
                </div>

                <img
                  src={require("../../assets/logo/round-logo.png")}
                  alt="about-logo"
                  className="card-logo"
                />

                <div className="card-content">
                  <div className="description">
                    <p>
                      <strong>Your Gaming Gear</strong> is a 3rd mini-project
                      from Dibimbing course FWD4 by Bhakti Mega Buana in the
                      form of an e-commerce website application that sales
                      gaming gear products. This website was created using a
                      framework called{" "}
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
                      uses JavaScript to make the display more interactive for
                      the user.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
