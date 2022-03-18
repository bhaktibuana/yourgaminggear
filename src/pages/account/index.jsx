import React, { useState, useEffect } from "react";
import Navbar from "../../components/admin/navbar";
import Sidebar from "../../components/admin/sidebar";
import RightSidebar from "../../components/admin/rightSidebar";
import Footer from "../../components/admin/footer";
import ProfileModal from "./profileModal";
import PasswordModal from "./passwordModal";
import DeleteModal from "./deleteModal";
import { Button, Input } from "antd";
import { MdEditNote, MdCancel, MdCheckCircle } from "react-icons/md";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import "yup-phone";
import { updateName, updateEmail, updatePhone, updateAddress } from "./helper";

import "./style.scss";

const Account = (props) => {
  const [userAuthData, setUserAuthData] = useState({});
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [isEditPhone, setIsEditPhone] = useState(false);
  const [confirmloading, setConfirmLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const nameInitialValue = {
    name: userAuthData.name,
  };

  const namevalidationSchema = yup.object({
    name: yup.string().max(50).required(),
  });

  const nameFormik = useFormik({
    enableReinitialize: true,
    initialValues: nameInitialValue,
    validationSchema: namevalidationSchema,
    onSubmit: (values) => {
      updateName(
        values.name,
        setConfirmLoading,
        setIsEditName,
        setUserAuthData
      );
    },
  });

  const emailInitialValue = {
    email: userAuthData.email,
  };

  const emailvalidationSchema = yup.object({
    email: yup.string().email().required(),
  });

  const emailFormik = useFormik({
    enableReinitialize: true,
    initialValues: emailInitialValue,
    validationSchema: emailvalidationSchema,
    onSubmit: (values) => {
      updateEmail(
        values.email,
        setConfirmLoading,
        setIsEditEmail,
        setUserAuthData
      );
    },
  });

  const phoneInitialValue = {
    phone_number: userAuthData.phone_number,
  };

  const phonevalidationSchema = yup.object({
    phone_number: yup.string().phone("ID").required(),
  });

  const phoneFormik = useFormik({
    enableReinitialize: true,
    initialValues: phoneInitialValue,
    validationSchema: phonevalidationSchema,
    onSubmit: (values) => {
      updatePhone(
        values.phone_number,
        setConfirmLoading,
        setIsEditPhone,
        setUserAuthData
      );
    },
  });

  const addressInitialValue = {
    address: userAuthData.address,
  };

  const addressvalidationSchema = yup.object({
    address: yup.string().max(255).required(),
  });

  const addressFormik = useFormik({
    enableReinitialize: true,
    initialValues: addressInitialValue,
    validationSchema: addressvalidationSchema,
    onSubmit: (values) => {
      updateAddress(
        values.address,
        setConfirmLoading,
        setIsEditAddress,
        setUserAuthData
      );
    },
  });

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
    getUserData();
  }, []);

  return (
    <>
      <div className={props.appState.isExpand ? "account-expand" : "account"}>
        <RightSidebar
          pageName="account"
          appState={props.appState}
          userAuthData={userAuthData}
        />
        <Navbar
          pageName="Account"
          appState={props.appState}
          userAuthData={userAuthData}
        />

        <div className="account-root">
          <div className="account-container">
            <div className="profile-card">
              <div className="profile-card-banner">
                <img
                  src={require("../../assets/img/profile-bg.png")}
                  alt="profile-banner"
                />
              </div>

              <div
                className="profile-image"
                onClick={() => setShowProfileModal(true)}
              >
                <img src={userAuthData.image_url} alt="profile" />

                <p>click to preview</p>
              </div>

              <div className="profile-content">
                <h1>{userAuthData.name}</h1>
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
                    {isEditName ? (
                      <Input
                        id="name"
                        name="name"
                        value={nameFormik.values.name}
                        onChange={nameFormik.handleChange}
                      />
                    ) : (
                      <p>{userAuthData.name}</p>
                    )}
                  </div>

                  <div className="button-container">
                    {isEditName ? (
                      <>
                        <Button
                          loading={confirmloading}
                          disabled={confirmloading}
                          type="primary"
                          onClick={() => {
                            if (nameFormik.errors.name) {
                              alert(nameFormik.errors.name);
                            } else {
                              nameFormik.handleSubmit();
                            }
                          }}
                        >
                          {!confirmloading ? <MdCheckCircle size={20} /> : " "}
                        </Button>

                        <Button
                          disabled={confirmloading}
                          type="danger"
                          onClick={() => {
                            setIsEditName(false);
                            nameFormik.resetForm();
                          }}
                        >
                          <MdCancel size={20} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled={confirmloading}
                          onClick={() => setIsEditName(true)}
                        >
                          <MdEditNote size={20} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="item">
                  <p className="label">Email :</p>

                  <div className="text-input">
                    {isEditEmail ? (
                      <Input
                        id="email"
                        name="email"
                        value={emailFormik.values.email}
                        onChange={emailFormik.handleChange}
                      />
                    ) : (
                      <p>{userAuthData.email}</p>
                    )}
                  </div>

                  <div className="button-container">
                    {isEditEmail ? (
                      <>
                        <Button
                          loading={confirmloading}
                          disabled={confirmloading}
                          type="primary"
                          onClick={() => {
                            if (emailFormik.errors.email) {
                              alert(emailFormik.errors.email);
                            } else {
                              emailFormik.handleSubmit();
                            }
                          }}
                        >
                          {!confirmloading ? <MdCheckCircle size={20} /> : " "}
                        </Button>

                        <Button
                          disabled={confirmloading}
                          type="danger"
                          onClick={() => {
                            setIsEditEmail(false);
                            emailFormik.resetForm();
                          }}
                        >
                          <MdCancel size={20} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled={confirmloading}
                          onClick={() => setIsEditEmail(true)}
                        >
                          <MdEditNote size={20} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="item">
                  <p className="label">Phone Number :</p>

                  <div className="text-input">
                    {isEditPhone ? (
                      <Input
                        id="phone_number"
                        name="phone_number"
                        value={phoneFormik.values.phone_number}
                        onChange={phoneFormik.handleChange}
                      />
                    ) : (
                      <p>{userAuthData.phone_number}</p>
                    )}
                  </div>

                  <div className="button-container">
                    {isEditPhone ? (
                      <>
                        <Button
                          loading={confirmloading}
                          disabled={confirmloading}
                          type="primary"
                          onClick={() => {
                            if (phoneFormik.errors.phone_number) {
                              alert(phoneFormik.errors.phone_number);
                            } else {
                              phoneFormik.handleSubmit();
                            }
                          }}
                        >
                          {!confirmloading ? <MdCheckCircle size={20} /> : " "}
                        </Button>

                        <Button
                          disabled={confirmloading}
                          type="danger"
                          onClick={() => {
                            setIsEditPhone(false);
                            phoneFormik.resetForm();
                          }}
                        >
                          <MdCancel size={20} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled={confirmloading}
                          onClick={() => setIsEditPhone(true)}
                        >
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
                      <Input
                        id="address"
                        name="address"
                        value={addressFormik.values.address}
                        onChange={addressFormik.handleChange}
                      />
                    ) : (
                      <p>{userAuthData.address}</p>
                    )}
                  </div>

                  <div className="button-container">
                    {isEditAddress ? (
                      <>
                        <Button
                          loading={confirmloading}
                          disabled={confirmloading}
                          type="primary"
                          onClick={() => {
                            if (addressFormik.errors.address) {
                              alert(addressFormik.errors.address);
                            } else {
                              addressFormik.handleSubmit();
                            }
                          }}
                        >
                          {!confirmloading ? <MdCheckCircle size={20} /> : " "}
                        </Button>

                        <Button
                          disabled={confirmloading}
                          type="danger"
                          onClick={() => {
                            setIsEditAddress(false);
                            addressFormik.resetForm();
                          }}
                        >
                          <MdCancel size={20} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled={confirmloading}
                          onClick={() => setIsEditAddress(true)}
                        >
                          <MdEditNote size={20} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <br />

                <div className="item">
                  <Button
                    onClick={() => setShowPasswordModal(true)}
                    style={{ margin: "0 5px 0 0" }}
                    type="primary"
                  >
                    Change Password
                  </Button>
                  <Button
                    onClick={() => setShowDeleteModal(true)}
                    style={{ margin: "0 0 0 5px" }}
                    type="danger"
                  >
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

      <ProfileModal
        visible={showProfileModal}
        setVisible={setShowProfileModal}
        userAuthData={userAuthData}
        setUserAuthData={setUserAuthData}
      />

      <PasswordModal
        visible={showPasswordModal}
        setVisible={setShowPasswordModal}
        userAuthData={userAuthData}
        setUserAuthData={setUserAuthData}
      />

      <DeleteModal
        visible={showDeleteModal}
        setVisible={setShowDeleteModal}
      />
    </>
  );
};

export default Account;
