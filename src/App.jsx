import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import AboutAdmin from "./pages/aboutAdmin";
import Account from "./pages/account";
import Catalog from "./pages/catalog";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import About from "./pages/about";
import CatalogId from "./pages/catalogId";
import { apiUrl } from "./api/apiUrl";

import "./App.scss";

const RequiredAuth = () => {
  const isAuth = localStorage.getItem("access_token");

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  // outlet is children of protected route
  return <Outlet />;
};

const RequireNoAuth = () => {
  const isAuth = localStorage.getItem("access_token");

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

function App() {
  const [isExpand, setIsExpand] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  
  const appState = {
    isExpand,
    setIsExpand,
    showRightSidebar,
    setShowRightSidebar
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public route */}
          <Route path="/" element={<Catalog appState={appState} apiUrl={apiUrl} />} />
          <Route path="/about" element={<About appState={appState} apiUrl={apiUrl} />} />
          <Route path="/product/:category-:id-:name" element={<CatalogId appState={appState} apiUrl={apiUrl} />} />

          {/* auth route */}
          <Route element={<RequireNoAuth />}>
            <Route path="/login" element={<Login apiUrl={apiUrl} />} />
            <Route path="/register" element={<Register apiUrl={apiUrl} />} />
          </Route>

          {/* protected route */}
          <Route element={<RequiredAuth />}>
            <Route path="/dashboard" element={<Dashboard appState={appState} apiUrl={apiUrl} />} />
            <Route path="/account" element={<Account appState={appState} apiUrl={apiUrl} />} />
            <Route path="/about-adm" element={<AboutAdmin appState={appState} apiUrl={apiUrl} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
