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
import { apiUrl } from "./api/apiUrl";

import "./App.scss";

const RequiredAuth = () => {
  const isAuth = true;

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  // outlet is children of protected route
  return <Outlet />;
};

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
          <Route path="/" element={<Catalog />} />

          {/* protected route */}
          <Route element={<RequiredAuth />}>
            <Route path="/dashboard" element={<Dashboard appState={appState} apiUrl={apiUrl} />} />
            <Route path="/account" element={<Account appState={appState} />} />
            <Route path="/about-adm" element={<AboutAdmin appState={appState} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
