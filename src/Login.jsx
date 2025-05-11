import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo-vaccine-portal.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "password") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg p-4 text-center"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <img src={logo} alt="VaxPortal Logo" style={{ height: "180px" }} />
        <h4 className="fw-bold  text-primary">VaxPortal</h4>
        <p className="text-primary  mb-4 " style={{ fontSize: "0.9rem" }}>
          Syncing Safety with Learning
        </p>

        <h5 className="mb-3">Admin Login</h5>

        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
