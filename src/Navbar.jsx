import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink } from "react-router-dom";
import logo from "./assets/logo-vaccine-portal.jpg";
import avatar from "./assets/avatar.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img src={logo} alt="VaxPortal Logo" style={{ height: "60px" }} />
          <h4 className="mb-0 fw-bold text-primary">VaxPortal</h4>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item px-2">
              <NavLink className="nav-link" to="/Dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink className="nav-link" to="/Students">
                Manage Students
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink className="nav-link" to="/VaccinationDrive">
                Manage Vaccination Drives
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={avatar}
                  alt="Avatar"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px" }}
                />
                <span className="fw-medium">Ms Tooba</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <NavLink className="dropdown-item" to="/">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
