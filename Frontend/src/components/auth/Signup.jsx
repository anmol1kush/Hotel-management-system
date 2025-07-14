import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleguestSubmit = async (e) => {
    e.preventDefault();
  
    const guestData = {
      ...formData,
      role: "guest",
    };
  
    if (
      !guestData.username ||
      !guestData.password ||
      !guestData.email ||
      guestData.password.length < 6
    ) {
      alert("Please fill all required fields and use a strong password.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:9090/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestData),
      });
  
      if (response.ok) {
        const user = await response.json(); // backend must return created user
        localStorage.setItem("userId", user.userId);
         // ✅ save userId to localStorage
         console.log(user);
        alert("Guest Signup Successful!");
        navigate("/guest-signup");
      } else {
        const errorText = await response.text();
        alert("Signup failed: " + errorText);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  

  const handlestaffSubmit = async (e) => {
    e.preventDefault();

    const staffData = {
      ...formData,
      role: "admin",
    };

    if (
      !staffData.username ||
      !staffData.password ||
      !staffData.email ||
      staffData.password.length < 6
    ) {
      alert("Please fill all required fields and use a strong password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staffData),
      });

      if (response.ok) {
        const user = await response.json(); // backend must return created user
        localStorage.setItem("userId", user.userId);
         // ✅ save userId to localStorage
         console.log(user);
        alert("Staff Signup Successful!");
        navigate("/staff-signup");
      } else {
        const errorText = await response.text();
        alert("Signup failed: " + errorText);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <div className="button-group">
          <button className="signup-button guest" onClick={handleguestSubmit}>
            Continue as Guest
          </button>
          <button className="signup-button staff" onClick={handlestaffSubmit}>
            Continue as Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
