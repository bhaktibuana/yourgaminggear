import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

import "./style.scss";

const Footer = () => {
  return (
    <>
      <div className="admin-footer">
        <div className="footer-container">
          <div className="header">
            <img
              src={require("../../../assets/logo/logo-transparent.png")}
              alt=""
            />
            <h1>Your Gaming Gear</h1>
          </div>

          <div className="body">
            <p>A place where you can get all the gaming gear you need</p>

            <div className="icon">
              <a
                className="instagram"
                href="https://www.instagram.com/bhakti_buana"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>

              <a
                className="facebook"
                href="https://www.facebook.com/bhakti.buana"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>

              <a
                className="linkedin"
                href="https://www.linkedin.com/in/bhaktibuana"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>

              <a
                className="github"
                href="https://github.com/bhaktibuana"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <p>
            Copyright © 2022 Your Gaming Gear, Developed by{" "}
            <a
              href="https://github.com/bhaktibuana"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bhakti Buana
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
