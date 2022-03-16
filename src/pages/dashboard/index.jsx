import React, { useState, useEffect } from "react";
import Navbar from "../../components/admin/navbar";
import RightSidebar from "../../components/admin/rightSidebar";
import Sidebar from "../../components/admin/sidebar";
import Footer from "../../components/admin/footer";
import { Table, Button, Form, Select, Popconfirm } from "antd";
import { MdEditNote, MdDeleteForever } from "react-icons/md";
import axios from "axios";

import "./style.scss";
import FormModal from "./formModal";

const currencyFormater = require("currency-formatter");

const Dashboard = (props) => {
  const [productsData, setProductsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalItem, setModalItem] = useState(null);

  const idrFormat = (value) => {
    return currencyFormater.format(value, { code: "IDR" });
  };

  const firstLetterUpperCase = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "3%",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (text) => firstLetterUpperCase(text),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text) => idrFormat(text),
    },
    {
      title: "Image Url",
      dataIndex: "image_url",
      key: "image_url",
      render: (text) => (
        <a title={text} href={text} target="_blank" rel="noopener noreferrer">
          {urlPreviewFormatting(text)}
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "12%",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            style={{ margin: "1px 1px" }}
            onClick={() => {
              setModalItem(record);
              setModalTitle("Edit Product");
              setModalVisible(true);
            }}
          >
            <MdEditNote size={20} />
          </Button>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteProductHandler(record.id)}
          >
            <Button
              type="danger"
              style={{ margin: "1px 1px" }}
            >
              <MdDeleteForever size={20} />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const urlPreviewFormatting = (url) => {
    const urlArr = url.split("");

    if (urlArr.length > 60) {
      const tempArr = urlArr.slice(0, 40);
      const endArr = urlArr.slice(urlArr.length - 17, urlArr.length);

      for (let i = 0; i < 3; i++) {
        tempArr.push(".");
      }

      tempArr.push(...endArr);

      return tempArr.join("");
    } else {
      return urlArr.join("");
    }
  }

  const fetchProducts = async (page) => {
    setIsLoading(true);

    try {
      if (categoryFilter === "all") {
        await axios
          .get(props.apiUrl.urlGetProducts, {
            params: {
              page,
              size: pageSize,
            },
          })
          .then((res) => {
            const data = res.data.data;
            for (let i = 0; i < data.length; i++) {
              data[i].key = i + 1 + (page - 1) * 10;
            }

            setProductsData(data);
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
          .get(props.apiUrl.urlGetProductsByCategory + categoryFilter, {
            params: {
              page,
              size: pageSize,
            },
          })
          .then((res) => {
            const data = res.data.data;
            for (let i = 0; i < data.length; i++) {
              data[i].key = i + 1 + (page - 1) * 10;
            }

            setProductsData(data);
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

  const deleteProductHandler = async (id) => {
    try {
      await axios
        .put(props.apiUrl.urlDeleteProductById + id)
        .then((res) => {
          fetchProducts(currentPage);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [pageSize, categoryFilter]);

  return (
    <>
      <div
        className={props.appState.isExpand ? "dashboard-expand" : "dashboard"}
      >
        <RightSidebar pageName="dashboard" appState={props.appState} />
        <Navbar pageName="Dashboard" appState={props.appState} />

        <div className="dashboard-root">
          <div className="dashboard-container">
            <div className="product-table-card">
              <div className="table-card-header">
                <p>Product Table</p>

                <div className="right-button">
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

                  <Button
                    type="primary"
                    onClick={() => {
                      setModalVisible(true);
                      setModalTitle("Add Product");
                      setModalItem(null);
                    }}
                  >
                    Add Product
                  </Button>
                </div>
              </div>

              <div className="table-card-body">
                <Table
                  style={{ width: "100%" }}
                  loading={isLoading}
                  rowKey={(record) => record.id}
                  columns={columns}
                  dataSource={productsData}
                  pagination={{
                    showSizeChanger: true,
                    defaultPageSize: pageSize,
                    defaultCurrent: 1,
                    total: totalPages,
                    onChange: (page) => {
                      setCurrentPage(page);
                      fetchProducts(page);
                    },
                    onShowSizeChange: (current, size) => {
                      setPageSize(size);
                    },
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                  }}
                />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <Sidebar pageName="dashboard" appState={props.appState} />

      <FormModal
        visible={modalVisible}
        modalTitle={modalTitle}
        modalItem={modalItem}
        setModalItem={setModalItem}
        setVisible={setModalVisible}
        apiUrl={props.apiUrl}
        fetchProducts={fetchProducts}
        currentPage={currentPage}
      />
    </>
  );
};

export default Dashboard;
