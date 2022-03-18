import React, { useState } from "react";
import Footer from "../../../components/auth/footer";
import Navbar from "../../../components/auth/navbar";
import { Alert, Spin } from "antd";
import { MdEmail, MdLock, MdMobileScreenShare, MdPerson } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from "yup";
import "yup-phone";
import axios from "axios";

import "./style.scss";

const Register = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputNameActive, setInputNameActive] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPhoneActive, setInputPhoneActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);
  const [inputPasswordConfActive, setInputPasswordConfActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = yup.object({
    name: yup.string().max(50).required(),
    email: yup.string().email().required(),
    phone_number: yup.string().phone("ID").required(),
    password: yup.string().min(8).required(),
    password_confirmation: yup
      .string()
      .min(8)
      .oneOf([yup.ref("password")], "password does't match")
      .required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: () => {
      signUp();
    },
  });

  const signUp = async () => {
    setConfirmLoading(true);

    const bodyParams = {
      name: formik.values.name,
      email: formik.values.email,
      phone_number: formik.values.phone_number,
      password: formik.values.password,
      password_confirmation: formik.values.password_confirmation,
      address: "-",
    };

    try {
      await axios
        .post(props.apiUrl.urlSignUp, bodyParams)
        .then((res) => {
          handleFormikReset();
          setConfirmLoading(false);
          setAlertMessage(
            "Registration success! You can login into your account."
          );
          setAlertType("success");
          setShowAlert(true);
        })
        .catch((err) => {
          handleFormikReset();
          setConfirmLoading(false);

          if (err.response.status === 400) {
            setAlertMessage(err.response.data.message);
            setAlertType("error");
            setShowAlert(true);
          }
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormikReset = () => {
    formik.setFieldValue("name", "");
    formik.setFieldValue("email", "");
    formik.setFieldValue("phone_number", "");
    formik.setFieldValue("password", "");
    formik.setFieldValue("password_confirmation", "");
    setInputNameActive(false);
    setInputEmailActive(false);
    setInputPhoneActive(false);
    setInputPasswordActive(false);
    setInputPasswordConfActive(false);
  };

  return (
    <>
      <div className="register">
        <div className="register-container">
          <Navbar path="/login" btnName="Sign In" />

          <div className="register-content">
            <div className="card">
              <div className="card-header">
                <div className="card-header-container">
                  <p className="title">Join With Us</p>
                  <p>Register your account for free!</p>
                </div>
              </div>

              <div className="card-body">
                {showAlert ? (
                  <Alert
                    style={{ width: "100%" }}
                    message={alertMessage}
                    type={alertType}
                  />
                ) : null}

                {confirmLoading ? (
                  <div className="spin-container">
                    <Spin size="large" tip="plase wait..." />
                  </div>
                ) : (
                  <form action="#">
                    <div className={inputNameActive ? "item focus" : "item"}>
                      <div className="icon">
                        <MdPerson size={18} />
                      </div>

                      <div>
                        <p>Name</p>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={() =>
                            formik.values.name === ""
                              ? setInputNameActive(false)
                              : setInputNameActive(true)
                          }
                          onFocus={() => {
                            setInputNameActive(true);
                            setShowAlert(false);
                          }}
                        />
                      </div>
                    </div>

                    {alertType !== "success" ? (
                      <>
                        {formik.touched["name"] &&
                          Boolean(formik.errors["name"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["name"]}</p>
                            </div>
                          )}
                      </>
                    ) : null}

                    <div className={inputEmailActive ? "item focus" : "item"}>
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

                    {alertType !== "success" ? (
                      <>
                        {formik.touched["email"] &&
                          Boolean(formik.errors["email"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["email"]}</p>
                            </div>
                          )}
                      </>
                    ) : null}

                    <div className={inputPhoneActive ? "item focus" : "item"}>
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

                    {alertType !== "success" ? (
                      <>
                        {formik.touched["phone_number"] &&
                          Boolean(formik.errors["phone_number"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["phone_number"]}</p>
                            </div>
                          )}
                      </>
                    ) : null}

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

                    {alertType !== "success" ? (
                      <>
                        {formik.touched["password"] &&
                          Boolean(formik.errors["password"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["password"]}</p>
                            </div>
                          )}
                      </>
                    ) : null}

                    <div
                      className={
                        inputPasswordConfActive ? "item focus" : "item"
                      }
                    >
                      <div className="icon">
                        <MdLock size={18} />
                      </div>

                      <div>
                        <p>Password Confirmation</p>
                        <input
                          id="password_confirmation"
                          name="password_confirmation"
                          type="password"
                          value={formik.values.password_confirmation}
                          onChange={formik.handleChange}
                          onBlur={() =>
                            formik.values.password === ""
                              ? setInputPasswordConfActive(false)
                              : setInputPasswordConfActive(true)
                          }
                          onFocus={() => {
                            setInputPasswordConfActive(true);
                            setShowAlert(false);
                          }}
                        />
                      </div>
                    </div>

                    {alertType !== "success" ? (
                      <>
                        {formik.touched["password_confirmation"] &&
                          Boolean(formik.errors["password_confirmation"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["password_confirmation"]}</p>
                            </div>
                          )}
                      </>
                    ) : null}

                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                      }}
                    >
                      Sign up
                    </button>

                    <p>
                      Already have account? <a href="/login">Login here</a>
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

export default Register;
