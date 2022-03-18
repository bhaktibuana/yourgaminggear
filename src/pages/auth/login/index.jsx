import React, { useState } from "react";
import Footer from "../../../components/auth/footer";
import Navbar from "../../../components/auth/navbar";
import { Alert, Spin } from "antd";
import { MdEmail, MdLock, MdMobileScreenShare } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from "yup";
import "yup-phone";
import axios from "axios";

import "./style.scss";

const Login = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isUseEmail, setIsUseEmail] = useState(true);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPhoneActive, setInputPhoneActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const initialValues = isUseEmail
    ? {
        email: "",
        password: "",
      }
    : {
        phone_number: "",
        password: "",
      };

  const validationSchema = yup.object().shape(
    isUseEmail
      ? {
          email: yup.string().email().required(),
          password: yup.string().min(8).required(),
        }
      : {
          phone_number: yup.string().phone("ID").required(),
          password: yup.string().min(8).required(),
        }
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: () => {
      if (isUseEmail) {
        signInByEmail();
      } else {
        signInByPhone();
      }
    },
  });

  const signInByEmail = async () => {
    setConfirmLoading(true);

    const bodyParams = {
      email: formik.values.email,
      password: formik.values.password,
    };

    try {
      await axios
        .post(props.apiUrl.urlSignInByEmail, bodyParams)
        .then((res) => {
          setInputEmailActive(false);
          setInputPhoneActive(false);
          setInputPasswordActive(false);
          formik.resetForm();

          localStorage.setItem("access_token", res.data.access_token);
          window.location.reload();
        })
        .catch((err) => {
          setInputEmailActive(false);
          setInputPhoneActive(false);
          setInputPasswordActive(false);
          formik.resetForm();
          setConfirmLoading(false);

          if (err.response.status === 403) {
            setShowAlert(true);
            setAlertMessage(err.response.data.message);
          }

          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const signInByPhone = async () => {
    setConfirmLoading(true);

    const bodyParams = {
      phone_number: formik.values.phone_number,
      password: formik.values.password,
    };

    try {
      await axios
        .post(props.apiUrl.urlSignInByPhone, bodyParams)
        .then((res) => {
          setInputEmailActive(false);
          setInputPhoneActive(false);
          setInputPasswordActive(false);
          formik.resetForm();

          localStorage.setItem("access_token", res.data.access_token);
          window.location.reload();
        })
        .catch((err) => {
          setInputEmailActive(false);
          setInputPhoneActive(false);
          setInputPasswordActive(false);
          formik.resetForm();
          setConfirmLoading(false);

          if (err.response.status === 403) {
            setShowAlert(true);
            setAlertMessage(err.response.data.message);
          }

          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeEmail = (state) => {
    setIsUseEmail(state);
    formik.resetForm();
  };

  return (
    <>
      <div className="login">
        <div className="login-container">
          <Navbar path="/register" btnName="Sign Up" />

          <div className="login-content">
            <div className="card">
              <div className="card-header">
                <div className="card-header-container">
                  <p>Login With</p>

                  <div className="header-button-container">
                    <button
                      className={
                        isUseEmail ? "header-button-active" : "header-button"
                      }
                      onClick={() => handleChangeEmail(true)}
                    >
                      Email
                    </button>

                    <button
                      className={
                        isUseEmail ? "header-button" : "header-button-active"
                      }
                      onClick={() => handleChangeEmail(false)}
                    >
                      Phone
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body">
                {showAlert ? (
                  <Alert
                    style={{ width: "100%" }}
                    message={alertMessage}
                    type="error"
                  />
                ) : null}

                {confirmLoading ? (
                  <div className="spin-container">
                    <Spin size="large" tip="authenticating..." />
                  </div>
                ) : (
                  <form action="#">
                    {isUseEmail ? (
                      <>
                        <div
                          className={inputEmailActive ? "item focus" : "item"}
                        >
                          <div className="icon">
                            <MdEmail size={18} />
                          </div>

                          <div>
                            <p>Email</p>

                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={() =>
                                formik.values.email === ""
                                  ? setInputEmailActive(false)
                                  : setInputEmailActive(true)
                              }
                              onFocus={() => {
                                setInputEmailActive(true);
                                setShowAlert(false);
                              }}
                            />
                          </div>
                        </div>

                        {formik.touched["email"] &&
                          Boolean(formik.errors["email"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["email"]}</p>
                            </div>
                          )}
                      </>
                    ) : (
                      <>
                        <div
                          className={inputPhoneActive ? "item focus" : "item"}
                        >
                          <div className="icon">
                            <MdMobileScreenShare size={18} />
                          </div>

                          <div>
                            <p>Phone Number</p>
                            <input
                              id="phone_number"
                              name="phone_number"
                              type="text"
                              value={formik.values.phone_number}
                              onChange={formik.handleChange}
                              onBlur={() =>
                                formik.values.phone_number === ""
                                  ? setInputPhoneActive(false)
                                  : setInputPhoneActive(true)
                              }
                              onFocus={() => {
                                setInputPhoneActive(true);
                                setShowAlert(false);
                              }}
                            />
                          </div>
                        </div>

                        {formik.touched["phone_number"] &&
                          Boolean(formik.errors["phone_number"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["phone_number"]}</p>
                            </div>
                          )}
                      </>
                    )}

                    <div
                      className={inputPasswordActive ? "item focus" : "item"}
                    >
                      <div className="icon">
                        <MdLock size={18} />
                      </div>

                      <div>
                        <p>Password</p>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={() =>
                            formik.values.password === ""
                              ? setInputPasswordActive(false)
                              : setInputPasswordActive(true)
                          }
                          onFocus={() => {
                            setInputPasswordActive(true);
                            setShowAlert(false);
                          }}
                        />
                      </div>
                    </div>

                    {formik.touched["password"] &&
                      Boolean(formik.errors["password"]) && (
                        <div className="error-msg">
                          <p>*{formik.errors["password"]}</p>
                        </div>
                      )}

                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                      }}
                    >
                      Sign in
                    </button>

                    <p>
                      Don't have account? <a href="/register">Register here</a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Login;
