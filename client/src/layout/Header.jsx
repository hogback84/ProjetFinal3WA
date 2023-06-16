import React from "react";
import NewBooks from "../components/Authors";
import BooksView from "../components/BooksView";
import Home from "../pages/Home";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Home />
      <NewBooks />
      <BooksView />
    </>
  );
};

export default Header;
