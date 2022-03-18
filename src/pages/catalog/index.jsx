import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import { Form, Pagination, Select, Spin } from "antd";
import ThumbnailCard from "./thumbnailCard";
import axios from "axios";

import "./style.scss";

const Catalog = (props) => {
  const [userAuthData, setUserAuthData] = useState({});
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchProducts = async (page) => {
    setIsLoading(true);

    const queryParams = {
      params: {
        page,
        size: pageSize,
      },
    };

    try {
      if (categoryFilter === "all") {
        await axios
          .get(props.apiUrl.urlGetProducts, queryParams)
          .then((res) => {
            const data = res.data.data;

            setProductsData(
              data.map((values) => (
                <ThumbnailCard
                  key={values.id}
                  productId={values.id}
                  name={values.name}
                  category={values.category}
                  quantity={values.quantity}
                  price={values.price}
                  imageUrl={values.image_url}
                />
              ))
            );

            setTotalPages(res.data.totalPages);
            setIsLoading(false);
          })
          .catch((err) => {
            if (err.response.status === 404) {
              setTotalPages(0);
              setIsLoading(false);
              setProductsData([]);
            }
            console.error(err);
          });
      } else {
        await axios
          .get(
            props.apiUrl.urlGetProductsByCategory + categoryFilter,
            queryParams
          )
          .then((res) => {
            const data = res.data.data;

            setProductsData(
              data.map((values) => (
                <ThumbnailCard
                  key={values.id}
                  productId={values.id}
                  name={values.name}
                  category={values.category}
                  quantity={values.quantity}
                  price={values.price}
                  imageUrl={values.image_url}
                />
              ))
            );

            setTotalPages(res.data.totalPages);
            setIsLoading(false);
          })
          .catch((err) => {
            if (err.response.status === 404) {
              setTotalPages(0);
              setIsLoading(false);
              setProductsData([]);
            }
            console.error(err);
          });
      }
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

    fetchProducts(1);
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [pageSize, categoryFilter]);

  return (
    <>
      <div className="catalog">
        <Sidebar
          pageName="catalog"
          userAuthData={userAuthData}
          appState={props.appState}
        />
        <Navbar
          pageName="catalog"
          userAuthData={userAuthData}
          appState={props.appState}
        />

        <div className="catalog-root">
          <div className="catalog-container">
            <div className="catalog-header">
              <div className="background-container">
                <img
                  src={require("../../assets/img/profile-bg.png")}
                  alt="catalog-bg"
                />
              </div>

              <div className="title-container">
                <h1>Welcome to Your Gaming Gear</h1>
                <p>A place where you can get all the gaming gear you need</p>
              </div>
            </div>

            <div className="catalog-body">
              <div className="filter-container">
                <p className="title">Catalog</p>

                <div className="filter">
                  <Form>
                    <Form.Item label="Category Filter">
                      <Select
                        style={{ width: "100px" }}
                        defaultValue={categoryFilter}
                        onChange={(value) => setCategoryFilter(value)}
                      >
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="mouse">Mouse</Select.Option>
                        <Select.Option value="keyboard">Keyboard</Select.Option>
                        <Select.Option value="headset">Headset</Select.Option>
                        <Select.Option value="mousepad">Mousepad</Select.Option>
                        <Select.Option value="chair">Chair</Select.Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </div>
              </div>

              {isLoading ? (
                <div className="spinner-container">
                  <Spin tip="Loading product..." size="large" />
                </div>
              ) : (
                <div className="thumbnail-card-container">{productsData}</div>
              )}

              <div className="pagination-container">
                <Pagination
                  showSizeChanger={true}
                  defaultCurrent={1}
                  defaultPageSize={pageSize}
                  total={totalPages}
                  onChange={(page) => {
                    fetchProducts(page);
                  }}
                  onShowSizeChange={(current, size) => {
                    setPageSize(size);
                  }}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Catalog;
