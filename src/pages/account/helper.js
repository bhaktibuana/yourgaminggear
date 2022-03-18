import axios from "axios";
import { apiUrl } from "../../api/apiUrl";

export const updateName = async (
  name,
  setConfirmLoading,
  setIsEditName,
  setUserAuthData
) => {
  setConfirmLoading(true);
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const bodyParams = {
    name: name,
  };

  try {
    await axios
      .put(apiUrl.urlUpdateUserName, bodyParams, config)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        setIsEditName(false);
        setConfirmLoading(false);
      })
      .then(() => {
        getUserData(setUserAuthData);
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message === "Token expired."
        ) {
          localStorage.removeItem("access_token");
          window.location.reload();
        }

        setIsEditName(false);
        setConfirmLoading(false);
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateEmail = async (
  email,
  setConfirmLoading,
  setIsEditEmail,
  setUserAuthData
) => {
  setConfirmLoading(true);
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const bodyParams = {
    email: email,
  };

  try {
    await axios
      .put(apiUrl.urlUpdateUserEmail, bodyParams, config)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        setIsEditEmail(false);
        setConfirmLoading(false);
      })
      .then(() => {
        getUserData(setUserAuthData);
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message === "Token expired."
        ) {
          localStorage.removeItem("access_token");
          window.location.reload();
        } else if (err.response.status === 400) {
          alert(err.response.data.message);
        }

        setIsEditEmail(false);
        setConfirmLoading(false);
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
};

export const updatePhone = async (
  phone_number,
  setConfirmLoading,
  setIsEditPhone,
  setUserAuthData
) => {
  setConfirmLoading(true);
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const bodyParams = {
    phone_number: phone_number,
  };

  try {
    await axios
      .put(apiUrl.urlUpdateUserPhoneNumber, bodyParams, config)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        setIsEditPhone(false);
        setConfirmLoading(false);
      })
      .then(() => {
        getUserData(setUserAuthData);
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message === "Token expired."
        ) {
          localStorage.removeItem("access_token");
          window.location.reload();
        } else if (err.response.status === 400) {
          alert(err.response.data.message);
        }

        setIsEditPhone(false);
        setConfirmLoading(false);
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateAddress = async (
  address,
  setConfirmLoading,
  setIsEditAddress,
  setUserAuthData
) => {
  setConfirmLoading(true);
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const bodyParams = {
    address: address,
  };

  try {
    await axios
      .put(apiUrl.urlUpdateUserAddress, bodyParams, config)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        setIsEditAddress(false);
        setConfirmLoading(false);
      })
      .then(() => {
        getUserData(setUserAuthData);
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message === "Token expired."
        ) {
          localStorage.removeItem("access_token");
          window.location.reload();
        }

        setIsEditAddress(false);
        setConfirmLoading(false);
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (
  old_password,
  password,
  password_confirmation,
  setConfirmLoading,
  setUserAuthData
) => {
  setConfirmLoading(true);

  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const bodyParams = {
    old_password: old_password,
    password: password,
    password_confirmation: password_confirmation,
  };

  try {
    await axios
      .put(apiUrl.urlUpdateUserPassword, bodyParams, config)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        setConfirmLoading(false);
        alert("Password updated successfully");
      })
      .then(() => {
        getUserData(setUserAuthData);
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message === "Token expired."
        ) {
          localStorage.removeItem("access_token");
          window.location.reload();
        } else if (err.response.status === 403) {
          alert(err.response.data.message);
        }

        setConfirmLoading(false);
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (password, setConfirmLoading) => {
  setConfirmLoading(true);

  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const bodyParams = {
    password: password,
  };

  try {
    await axios
      .put(apiUrl.urlDeleteUser, bodyParams, config)
      .then(() => {
        localStorage.removeItem("access_token");
        window.location.reload();
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message === "Token expired."
        ) {
          localStorage.removeItem("access_token");
          window.location.reload();
        } else if (err.response.status === 403) {
          alert(err.response.data.message);
        }

        setConfirmLoading(false);
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateImage = async (
  image,
  image_name,
  setConfirmLoading,
  setUserAuthData
) => {
  setConfirmLoading(true);

  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const bodyParams = {
    image_name: image_name,
  };
  const queryParams = {
    params: {
      image_name: image_name,
    },
  };

  try {
    await axios
      .put(apiUrl.urlUpdateUserImage, bodyParams, config)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
      })
      .then(() => {
        uploadImage(image, queryParams, setUserAuthData);
        setConfirmLoading(false);
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message === "Token expired."
        ) {
          localStorage.removeItem("access_token");
          window.location.reload();
        }

        setConfirmLoading(false);
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
};

const uploadImage = async (image, params, setUserAuthData) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    await axios
      .post(apiUrl.urlUploadProfileImage, formData, params)
      .then(() => {
        getUserData(setUserAuthData);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
};

const getUserData = async (setUserAuthData) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    await axios
      .get(apiUrl.urlGetDataUserAuth, config)
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
