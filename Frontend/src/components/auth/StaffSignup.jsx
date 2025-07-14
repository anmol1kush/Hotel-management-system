import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GuestStaffSignup.css";

const StaffSignup = () => {
  const navigate = useNavigate();

  const [staff, setStaff] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
    hireDate: ""
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(parseInt(storedId));
    } else {
      alert("User ID not found. Please sign up first.");
      navigate("/signup");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting staff form...");

    if (!userId) {
      alert("User ID is missing. Cannot proceed.");
      return;
    }
    const staffData = {
      ...staff,
      userId,
    };
  
    try {
      const response = await fetch("http://localhost:9090/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(staffData) // make sure userData contains name, email, etc.
      });
      console.log(userId);
      console.log("Sending guest data:", staffData);
  
      
  
      if (response.ok) {
        alert("staff profile created successfully!");
        // or result.id depending on your backend
        localStorage.removeItem("userId"); // ✅ Save it
  
        alert("Signup successful!");

  
        // Optional: Redirect to Guest/Staff profile page
        navigate("/login"); // or /staff-signup
      } else {
        const errorText = await response.text();
        alert("Failed to create guest profile: " + errorText);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Staff Signup</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="hireDate"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default StaffSignup;
