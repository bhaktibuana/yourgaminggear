const apiBaseUrl = "http://localhost:3001";
// const apiBaseUrl = "https://buanastore-server.herokuapp.com";

export const apiUrl = {
  urlGetProducts: `${apiBaseUrl}/product`,
  urlGetProductsByCategory: `${apiBaseUrl}/product/`,
  urlAddProductDefault: `${apiBaseUrl}/product/default`,
  urlAddProduct: `${apiBaseUrl}/product`,
  urlUpdateProductDefault: `${apiBaseUrl}/product/default/`,
  urlUpdateProduct: `${apiBaseUrl}/product/`,
  urlDeleteProductById: `${apiBaseUrl}/product/delete/`,
  urlUploadProductImage: `${apiBaseUrl}/upload/product`,
};
