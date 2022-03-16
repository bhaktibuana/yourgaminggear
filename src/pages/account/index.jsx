import React, { useState } from "react";
import Navbar from "../../components/admin/navbar";
import Sidebar from "../../components/admin/sidebar";
import RightSidebar from "../../components/admin/rightSidebar";
import Footer from "../../components/admin/footer";
import { Button, Input } from "antd";
import { MdEditNote, MdCancel, MdCheckCircle } from "react-icons/md";

import "./style.scss";

const Account = (props) => {
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [isEditPhone, setIsEditPhone] = useState(false);

  return (
    <>
      <div className={props.appState.isExpand ? "account-expand" : "account"}>
        <RightSidebar pageName="account" appState={props.appState} />
        <Navbar pageName="Account" appState={props.appState} />

        <div className="account-root">
          <div className="account-container">
            <div className="profile-card">
              <div className="profile-card-banner">
                <img
                  src={require("../../assets/img/profile-bg.png")}
                  alt="profile-banner"
                />
              </div>

              <div className="profile-image">
                <img
                  src={require("../../assets/img/profile.png")}
                  alt="profile"
                />

                <p>click to preview</p>
              </div>

              <div className="profile-content">
                <h1>Bhakti Mega Buana</h1>
                <p>Your Gaming Gear Admin</p>
              </div>
            </div>

            <div className="account-detail-card">
              <div className="account-detail-card-header">
                <p>Account Detail</p>
              </div>

              <div className="account-detail-card-body">
                <div className="item">
                  <p className="label">Name :</p>

                  <div className="text-input">
                    {isEditName ? <Input /> : <p>Bhakti Mega Buana</p>}
                  </div>

                  <div className="button-container">
                    {isEditName ? (
                      <>
                        <Button
                          type="primary"
                          onClick={() => setIsEditName(true)}
                        >
                          <MdCheckCircle size={20} />
                        </Button>

                        <Button
                          type="danger"
                          onClick={() => setIsEditName(false)}
                        >
                          <MdCancel size={20} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setIsEditName(true)}>
                          <MdEditNote size={20} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="item">
                  <p className="label">Email :</p>

                  <div className="text-input">
                    {isEditEmail ? <Input /> : <p>bhaktibuana19@gmail.com</p>}
                  </div>

                  <div className="button-container">
                    {isEditEmail ? (
                      <>
                        <Button
                          type="primary"
                          onClick={() => setIsEditEmail(true)}
                        >
                          <MdCheckCircle size={20} />
                        </Button>

                        <Button
                          type="danger"
                          onClick={() => setIsEditEmail(false)}
                        >
                          <MdCancel size={20} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setIsEditEmail(true)}>
                          <MdEditNote size={20} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="item">
                  <p className="label">Phone Number :</p>

                  <div className="text-input">
                    {isEditPhone ? <Input /> : <p>+62 81232941036</p>}
                  </div>

                  <div className="button-container">
                    {isEditPhone ? (
                      <>
                        <Button
                          type="primary"
                          onClick={() => setIsEditPhone(true)}
                        >
                          <MdCheckCircle size={20} />
                        </Button>

                        <Button
                          type="danger"
                          onClick={() => setIsEditPhone(false)}
                        >
                          <MdCancel size={20} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setIsEditPhone(true)}>
                          <MdEditNote size={20} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="item">
                  <p className="label">Address :</p>

                  <div className="text-input">
                    {isEditAddress ? (
                      <Input />
                    ) : (
                      <p>
                        Jl. Letjen Suprapto No.72, Nganjuk (64416) asda sda sdas
                        asdas
                      </p>
                    )}
                  </div>

                  <div className="button-container">
                    {isEditAddress ? (
                      <>
                        <Button
                          type="primary"
                          onClick={() => setIsEditAddress(true)}
                        >
                          <MdCheckCircle size={20} />
                        </Button>

                        <Button
                          type="danger"
                          onClick={() => setIsEditAddress(false)}
                        >
                          <MdCancel size={20} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setIsEditAddress(true)}>
                          <MdEditNote size={20} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <br />

                <div className="item">
                  <Button style={{ margin: "0 5px 0 0" }} type="primary">
                    Change Password
                  </Button>
                  <Button style={{ margin: "0 0 0 5px" }} type="danger">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
      <Sidebar pageName="account" appState={props.appState} />
    </>
  );
};

export default Account;
