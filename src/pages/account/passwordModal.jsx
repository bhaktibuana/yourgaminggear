import React, { useState } from "react";
import { Input, Modal } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { updatePassword } from "./helper";

import "./passwordModal.scss";

const PasswordModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const initialValues = {
    old_password: "",
    new_password: "",
    new_password_confirm: "",
  };

  const validationSchema = yup.object().shape({
    old_password: yup.string().min(8).required(),
    new_password: yup.string().min(8).required(),
    new_password_confirm: yup
      .string()
      .min(8)
      .oneOf([yup.ref("new_password")], "password does't match")
      .required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      updatePassword(
        values.old_password,
        values.new_password,
        values.new_password_confirm,
        setConfirmLoading,
        props.setUserAuthData
      ).then(() => {
        handleCancel();
      });
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    props.setVisible(false);
  };

  const handleOk = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <Modal
        title="Change Password"
        visible={props.visible}
        onCancel={handleCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <form className="password-modal" action="#">
          <div className="item">
            <label>Old Password</label>

            <div className="input-container">
              <Input
                id="old_password"
                name="old_password"
                type="password"
                value={formik.values.old_password}
                onChange={formik.handleChange}
              />

              {formik.touched["old_password"] &&
                Boolean(formik.errors["old_password"]) && (
                  <div className="error-msg">
                    <p>{formik.errors["old_password"]}</p>
                  </div>
                )}
            </div>
          </div>

          <div className="item">
            <label>New Password</label>

            <div className="input-container">
              <Input
                id="new_password"
                name="new_password"
                type="password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
              />

              {formik.touched["new_password"] &&
                Boolean(formik.errors["new_password"]) && (
                  <div className="error-msg">
                    <p>{formik.errors["new_password"]}</p>
                  </div>
                )}
            </div>
          </div>

          <div className="item">
            <label>New Password Confirm</label>

            <div className="input-container">
              <Input
                id="new_password_confirm"
                name="new_password_confirm"
                type="password"
                value={formik.values.new_password_confirm}
                onChange={formik.handleChange}
              />

              {formik.touched["new_password_confirm"] &&
                Boolean(formik.errors["new_password_confirm"]) && (
                  <div className="error-msg">
                    <p>{formik.errors["new_password_confirm"]}</p>
                  </div>
                )}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PasswordModal;
