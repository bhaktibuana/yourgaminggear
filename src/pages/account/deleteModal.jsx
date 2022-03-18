import React, { useState } from "react";
import { Modal, Input } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { deleteUser } from "./helper";

import "./deleteModal.scss";

const DeleteModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const initialValues = {
    password: "",
  };

  const validationSchema = yup.object().shape({
    password: yup.string().min(8).required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      deleteUser(values.password, setConfirmLoading);
    },
  });

  const handleCancel = () => {
    props.setVisible(false);
    formik.resetForm();
  };

  return (
    <>
      <Modal
        title="Delete Account"
        visible={props.visible}
        onCancel={handleCancel}
        onOk={formik.handleSubmit}
        confirmLoading={confirmLoading}
      >
        <form action="#" className="delete-modal">
          <div className="item">
            <label>Password</label>

            <div className="input-container">
              <Input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />

              {formik.touched["password"] &&
                Boolean(formik.errors["password"]) && (
                  <div className="error-msg">
                    <p>{formik.errors["password"]}</p>
                  </div>
                )}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default DeleteModal;
