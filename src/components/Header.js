import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getApp, initializeApp } from "firebase/app";
import { useContext, useEffect, useState } from "react";
import firebaseConfig from "../config/firebaseConfig";
import UserContext from "../context/UserContext";
function Header() {
  const { user } = useContext(UserContext);

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

              {user && (
                <li className="nav-item dropdown dropdown-slide">
                  <Link className="nav-link" to={{ pathname: "/cart" }}>
                    Cart
                  </Link>
                </li>
              )}

              {!user ? (
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

              <li className="nav-item">
                <Link className="nav-link" to={{ pathname: "/aboutus" }}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <ul
            className="top-menu list-inline mb-0 d-none d-lg-block"
            id="top-menu"
          >
            <li className="list-inline-item">
              <a href="#" className="search_toggle" id="search-icon">
                <i className="tf-ion-android-search"></i>
              </a>
            </li>

            {user && (
              <li className="dropdown cart-nav dropdown-slide list-inline-item">
                <a
                  href="#"
                  className="dropdown-toggle cart-icon"
                  data-toggle="dropdown"
                  data-hover="dropdown"
                >
                  <i className="tf-ion-android-cart"></i>
                </a>
                <div className="dropdown-menu cart-dropdown">
                  <div className="media">
                    <a href="/single-product">
                      <img
                        className="media-object img- mr-3"
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        alt="image"
                      />
                    </a>
                    <div className="media-body">
                      <h6>Sunset</h6>
                      <div className="cart-price">
                        <span>1 x</span>
                        <span>0.00016 Eth</span>
                      </div>
                    </div>
                    <a href="#" className="remove">
                      <i className="tf-ion-close"></i>
                    </a>
                  </div>

                  <div className="media">
                    <a href="/single-product">
                      <img
                        className="media-object img-fluid mr-3"
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        alt="image"
                      />
                    </a>
                    <div className="media-body">
                      <h6>Sunset</h6>
                      <div className="cart-price">
                        <span>1 x</span>
                        <span>0.00016 Eth</span>
                      </div>
                    </div>
                    <a href="#" className="remove">
                      <i className="tf-ion-close"></i>
                    </a>
                  </div>

                  <div className="cart-summary">
                    <span className="h6">Total</span>
                    <span className="total-price h6">0.000235 Eth</span>

                    <div className="text-center cart-buttons mt-3">
                      <a
                        href="#"
                        className="btn btn-small btn-transparent btn-block"
                      >
                        View Cart
                      </a>
                      <a href="#" className="btn btn-small btn-main btn-block">
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            )}
            {user && (
              <li className="list-inline-item">
                <a href="#">
                  <i className="tf-ion-ios-person mr-3"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
