import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  useEffect(() => {
    // jab bhi route change ho, login state update karo
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userId");
  localStorage.removeItem("guestId");
  setIsLoggedIn(false);
  alert("Logged out successfully!");
  navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏨 HotelHub
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/rooms" className="nav-link">Rooms</Link>
          <Link to="/allreviews" className="nav-link">Reviews</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-btn login-btn">
                Login
              </Link>
              <Link to="/signup" className="nav-btn signup-btn">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
