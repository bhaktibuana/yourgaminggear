import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import axios from "axios";

import "./style.scss";
import { Button } from "antd";

const currencyFormater = require("currency-formatter");

const CatalogId = (props) => {
  const [userAuthData, setUserAuthData] = useState({});
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id, category, name } = useParams();

  const idrFormat = (value) => {
    return currencyFormater.format(value, { code: "IDR" });
  };

  const firstLetterUpperCase = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const fetchProduct = async (id) => {
    setIsLoading(true);

    try {
      await axios
        .get(props.apiUrl.urlGetProductById + id)
        .then((res) => {
          setProductData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setIsLoading(false);
            setProductData({});
            alert("Product not found");
          }
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

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
    if (localStorage.getItem("access_token")) {
      getUserData();
    }

    fetchProduct(id);
  }, []);

  return (
    <>
      <div className="catalog-id">
        <Sidebar
          pageName="catalog-id"
          userAuthData={userAuthData}
          appState={props.appState}
        />
        <Navbar
          pageName="catalog-id"
          userAuthData={userAuthData}
          appState={props.appState}
        />

        <div className="catalog-id-root">
          <div className="catalog-id-container">
            <div className="catalog-id-header">
              <div className="background-container">
                <img
                  src={require("../../assets/img/about-bg.png")}
                  alt="catalog-bg"
                />
              </div>

              <div className="title-container">
                <h1>Welcome to Your Gaming Gear</h1>
                <p>A place where you can get all the gaming gear you need</p>
              </div>
            </div>

            <div className="catalog-id-body">
              <div className="title-category-container">
                <p className="title">Product</p>

                <div className="category">
                  <p>Category: {firstLetterUpperCase(category)}</p>
                </div>
              </div>

              <div className="product-card-container">
                <a
                  href={productData.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="image-container"
                >
                  <img src={productData.image_url} alt="product" />
                </a>

                <div className="product-card-body">
                  <div className="content-top">
                    <h1>{productData.name}</h1>

                    <h3>
                      {/* Category: {firstLetterUpperCase(productData.category)} */}
                      Category: {productData.category}
                    </h3>

                    <h3>Stock: {productData.quantity}</h3>
                    <h3>Price: {idrFormat(productData.price)}</h3>
                  </div>

                  <div className="content-bottom">
                    <Button style={{ margin: "10px" }} type="danger">
                      Add to wishlist
                    </Button>

                    <Button style={{ margin: "10px" }} type="primary">
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default CatalogId;
