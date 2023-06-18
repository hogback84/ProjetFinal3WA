import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuData } from "./MenuData.js";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav id="navbar" className="navbar-items">
      <Link to="/" aria-label="Go to Momo Store Home">
        <div className="navbar-left">
          <span>Momo</span>
          <i className="fa-solid fa-book-open"></i>
          <span>Store</span>
        </div>
      </Link>
      <div className="navbar-menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "navbar-center active" : "navbar-center"}>
        {MenuData.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.URL} className={item.cName}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="nav-item">
        <Link
          className="nav-icon "
          to={"./shoppingcart"}
          aria-label="View shopping cart"
        >
          <i className="fa fa-fw fa-cart-arrow-down " />
          <span className="navbar-cart "></span>
        </Link>

        <div className="navbar-inline">
          {currentUser ? (
            <>
              {currentUser.role === "admin" && (
                <Link
                  to="/admin"
                  className="your-button-class"
                  aria-label="Admin panel"
                >
                  Admin
                </Link>
              )}

              <button onClick={handleLogout} aria-label="Logout">
                <i className="fa fa-sign-out-alt"></i>
              </button>
            </>
          ) : (
            <Link to="/auth" aria-label="Login">
              <i className="fa fa-user"></i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
