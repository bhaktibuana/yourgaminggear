import React, { useState } from "react";
import { Modal, Input, Select, InputNumber } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import "./formModal.scss";

const validationSchema = yup.object().shape({
  name: yup.string().max(50).required(),
  category: yup.string().required(),
  quantity: yup.number().required().positive().integer(),
  price: yup.number().required().positive().integer(),
});

const FormModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: props.modalItem ? props.modalItem.name : "",
      category: props.modalItem ? props.modalItem.category : "",
      quantity: props.modalItem ? props.modalItem.quantity : 0,
      price: props.modalItem ? props.modalItem.price : 0,
      image_name: "",
    },
    validationSchema,
    onSubmit: () => {
      if (props.modalTitle === "Add Product") {
        addProduct();
      } else {
        updateProduct();
      }
    },
  });

  const addProduct = async () => {
    setConfirmLoading(true);

    try {
      if (formik.values.image_name === "") {
        await axios
          .post(props.apiUrl.urlAddProductDefault, {
            name: formik.values.name,
            category: formik.values.category,
            quantity: formik.values.quantity,
            price: formik.values.price,
          })
          .then((res) => {
            handleClose();
            props.fetchProducts(props.currentPage);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        await axios
          .post(props.apiUrl.urlAddProduct, {
            name: formik.values.name,
            category: formik.values.category,
            quantity: formik.values.quantity,
            price: formik.values.price,
            image_name: formik.values.image_name,
          })
          .then((res) => {
            uploadImage();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async () => {
    setConfirmLoading(true);

    try {
      if (formik.values.image_name === "") {
        await axios
          .put(props.apiUrl.urlUpdateProductDefault + props.modalItem.id, {
            name: formik.values.name,
            category: formik.values.category,
            quantity: formik.values.quantity,
            price: formik.values.price,
          })
          .then((res) => {
            handleClose();
            props.fetchProducts(props.currentPage);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        await axios
          .put(props.apiUrl.urlUpdateProduct + props.modalItem.id, {
            name: formik.values.name,
            category: formik.values.category,
            quantity: formik.values.quantity,
            price: formik.values.price,
            image_name: formik.values.image_name,
          })
          .then((res) => {
            uploadImage();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", tempImage);

      await axios
        .post(props.apiUrl.urlUploadProductImage, formData, {
          params: {
            image_name: formik.values.image_name,
          },
        })
        .then((res) => {
          handleClose();
          props.fetchProducts(props.currentPage);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setConfirmLoading(false);
    props.setVisible(false);
    document.getElementById("choose-img").value = "";
    formik.setFieldValue("name", "");
    formik.setFieldValue("category", "");
    formik.setFieldValue("quantity", 0);
    formik.setFieldValue("price", 0);
    formik.setFieldValue("image_name", "");
    setTempImage(null);
    props.setModalItem(null);
  };

  const handleImageChange = (e) => {
    formik.setFieldValue("image_name", imageNameParse(e.target.files[0].name));
    setTempImage(e.target.files[0]);
  };

  const imageNameParse = (imageName) => {
    const outputArr = [];
    const imageNameArr = imageName.split(".");
    const fileExtension = imageNameArr[imageNameArr.length - 1];
    const fileName =
      imageNameArr.slice(0, imageNameArr.length - 1).join(".") +
      "-" +
      Date.now();

    outputArr.push(fileName);
    outputArr.push(fileExtension);

    return outputArr.join(".");
  };

  return (
    <>
      <Modal
        title={props.modalTitle}
        visible={props.visible}
        onCancel={handleClose}
        onOk={formik.handleSubmit}
        confirmLoading={confirmLoading}
      >
        <form className="form-modal" action="#">
          <div className="item">
            <label>Product Name</label>

            <div className="input-container">
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />

              {formik.touched["name"] && Boolean(formik.errors["name"]) && (
                <div className="error-msg">
                  <p>{formik.errors["name"]}</p>
                </div>
              )}
            </div>
          </div>

          <div className="item">
            <label>Category</label>

            <div className="input-container">
              <Select
                style={{ width: "100%" }}
                value={formik.values.category}
                onChange={(value) => formik.setFieldValue("category", value)}
              >
                <Select.Option value="mouse">Mouse</Select.Option>
                <Select.Option value="keyboard">Keyboard</Select.Option>
                <Select.Option value="headset">Headset</Select.Option>
                <Select.Option value="mousepad">Mousepad</Select.Option>
                <Select.Option value="chair">Chair</Select.Option>
              </Select>

              {formik.touched["category"] &&
                Boolean(formik.errors["category"]) && (
                  <div className="error-msg">
                    <p>{formik.errors["category"]}</p>
                  </div>
                )}
            </div>
          </div>

          <div className="item">
            <label>Quantity</label>

            <div className="input-container">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                value={formik.values.quantity}
                onChange={(value) => formik.setFieldValue("quantity", value)}
              />

              {formik.touched["quantity"] &&
                Boolean(formik.errors["quantity"]) && (
                  <div className="error-msg">
                    <p>{formik.errors["quantity"]}</p>
                  </div>
                )}
            </div>
          </div>

          <div className="item">
            <label>Price</label>

            <div className="input-container">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                prefix="Rp"
                style={{ width: "100%" }}
                min={0}
                value={formik.values.price}
                onChange={(value) => formik.setFieldValue("price", value)}
              />

              {formik.touched["price"] && Boolean(formik.errors["price"]) && (
                <div className="error-msg">
                  <p>{formik.errors["price"]}</p>
                </div>
              )}
            </div>
          </div>

          <div className="item">
            <label>Product Image</label>

            <div className="input-container">
              <input
                id="choose-img"
                className="input-file"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleImageChange}
              />

              {formik.values.image_name === "" ? (
                <p>*the default image will be used if not uploading an image</p>
              ) : null}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FormModal;
