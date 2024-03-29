import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
function Header() {
  const { userdata } = useContext(UserContext);
  const { pathname } = useLocation();
  if (pathname === "/profile") return null;

  return (
    <div className="fixed-top">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation"
        id="navbar"
      >
        <div className="container">
          <Link
            className="navbar-brand font-weight-bold"
            to={{ pathname: "/" }}
          >
            Digimart
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main-navbar"
            aria-controls="main-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="main-navbar">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={{ pathname: "/" }}>
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown dropdown-slide">
                <Link className="nav-link" to={{ pathname: "/shop" }}>
                  Shop
                </Link>
              </li>
              <li className="nav-item dropdown dropdown-slide">
                <Link className="nav-link" to={{ pathname: "/search" }}>
                  Search
                </Link>
              </li>

              {userdata && (
                <li className="nav-item dropdown dropdown-slide">
                  <Link className="nav-link" to={{ pathname: "/cart" }}>
                    Cart
                  </Link>
                </li>
              )}

              {!userdata ? (
                <li className="nav-item dropdown dropdown-slide">
                  <Link className="nav-link" to={{ pathname: "/login" }}>
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item dropdown dropdown-slide">
                  <Link
                    className="nav-link"
                    onClick={() => {
                      getAuth().signOut();
                    }}
                    to={{ pathname: "/" }}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <ul
            className="top-menu list-inline mb-0 d-none d-lg-block"
            id="top-menu"
          >
            <li className="list-inline-item">
              <Link to={"/search"} className="search_toggle" id="search-icon">
                <i className="tf-ion-android-search"></i>
              </Link>
            </li>

            {userdata && (
              <li className="list-inline-item">
                <Link to={"/profile"}>
                  <i className="tf-ion-ios-person mr-3"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
