//Layout.jsx
import React from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
