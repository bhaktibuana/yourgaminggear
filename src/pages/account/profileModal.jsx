import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import { updateImage } from "./helper";

import "./profileModal.scss";

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const ProfileModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const handleCancel = () => {
    setTempImage(null);
    document.getElementById("upload-picture").value = "";
    props.setVisible(false);
  };

  const handleOnChange = (info) => {
    if (info.file.status === "done") {
      setTempImage(info.fileList[0].originFileObj);
    }
  };

  const handleOk = () => {
    if (tempImage) {
      updateImage(
        tempImage,
        imageNameParse(tempImage.name),
        setConfirmLoading,
        props.setUserAuthData
      ).then(() => {
        handleCancel();
      });
    } else {
      handleCancel();
    }
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
        title="Profile Picture"
        visible={props.visible}
        onCancel={handleCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <div className="profile-modal">
          <div className="profile-picture">
            <a
              href={props.userAuthData.image_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={props.userAuthData.image_url} alt="profile" />
            </a>
          </div>

          <div className="upload-picture-container">
            <Upload
              id="upload-picture"
              className="upload-picture"
              customRequest={dummyRequest}
              listType="picture"
              maxCount={1}
              accept=".jpg, .jpeg, .png"
              onChange={handleOnChange}
            >
              <Button>Select file to upload</Button>
            </Upload>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
