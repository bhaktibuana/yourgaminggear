import React from "react";
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
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public route */}
          <Route path="/" element={<Catalog />} />
          
          {/* protected route */}
          <Route element={<RequiredAuth />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about-adm" element={<AboutAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
