import React from "react";
import { FaEnvelope, FaGlobe, FaFacebookF, FaTwitter, FaVimeoV, FaGooglePlusG, FaSearch, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";

const Headerseaction = () => {
  return (
    <>
      <div className="bg-light py-2 border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start small">
              <FaEnvelope className="me-1" />
              support@example.com &nbsp; | &nbsp;
              <FaGlobe className="me-1" />
              Kleine Pierbard 8-6 2249 KV Vries
            </div>
            <div className="col-md-6 text-center text-md-end">
              <span className="me-3">
                <FaFacebookF className="me-2" />
                <FaTwitter className="me-2" />
                <FaVimeoV className="me-2" />
                <FaGooglePlusG />
              </span>
              <span className="me-3"> | 🌐 English </span>
              <span> USD </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3" href="/">
            castro<span className="text-danger">.</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-danger" href="/" role="button" data-bs-toggle="dropdown">
                  Home
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/">Home 1</a></li>
                  <li><a className="dropdown-item" href="/">Home 2</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" data-bs-toggle="dropdown">Pages</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/">About</a></li>
                  <li><a className="dropdown-item" href="/">Team</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown position-relative">
                <a className="nav-link dropdown-toggle" href="/" data-bs-toggle="dropdown">
                  Shop <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">Hot</span>
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/">All Products</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" data-bs-toggle="dropdown">Elements</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/">Banner</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" data-bs-toggle="dropdown">Blog</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/">Blog List</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Contact</a>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              <FaSearch />
              <FaHeart />
              <FaUser />
              <div className="position-relative">
                <FaShoppingCart />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Headerseaction;