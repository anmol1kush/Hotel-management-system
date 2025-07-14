import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GuestStaffSignup.css";

const GuestSignup = () => {
  const navigate = useNavigate();
  const [guest, setGuest] = useState({
    address: "",
    city: "",
    country: "",
    idProofType: "",
    idProofNumber: "",
  });

  const [userId, setUserId] = useState(null);

  // ✅ Fetch userId from localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    } else {
      alert("User ID not found. Please sign up first.");
      navigate("/signup");
    }
  }, [navigate]);
  

  const handleChange = (e) => {
    setGuest({ ...guest, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID is missing. Cannot proceed.");
      return;
    }

    const guestData = {
      ...guest,
      userId,
    };


    try {
      const response = await fetch("http://localhost:9090/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestData),
      });
      console.log(userId);
      console.log("Sending guest data:", guestData);

      if (response.ok) {
      
        alert("Guest profile created successfully!");
      
        localStorage.removeItem("userId"); // optional
        navigate("/login"); // ✅ or dashboard
      }
      else {
        const errorText = await response.text();
        alert("Failed to create guest profile: " + errorText);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Guest Signup</h2>
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          required
        />

        <select name="idProofType" onChange={handleChange} required>
          <option value="">Select ID Proof</option>
          <option value="driver_license">Driver's License</option>
          <option value="passport">Passport</option>
          <option value="aadhaar">Aadhaar</option>
        </select>


        <input
          type="text"
          name="idProofNumber"
          placeholder="ID Proof Number"
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default GuestSignup;
