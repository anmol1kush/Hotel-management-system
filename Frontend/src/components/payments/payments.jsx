import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payments.css";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const amountFromBooking = queryParams.get("amount");
  const guestId = queryParams.get("guestId");
  const roomId = queryParams.get("roomId");
  const bookingId = queryParams.get("bookingId");

  const [payment, setPayment] = useState({
    amount: amountFromBooking || "",
    paymentMethod: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  useEffect(() => {
    setPayment((prev) => ({ ...prev, amount: amountFromBooking }));
  }, [amountFromBooking]);

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the API payload with correct field names and payment_date
    const payload = {
      booking_id: parseInt(bookingId),
      amount: parseFloat(payment.amount).toFixed(2),
      payment_method: payment.paymentMethod,
      payment_date: new Date().toISOString(), // ISO format date
      status: "paid",
    };

    try {
      const response = await fetch("http://localhost:9090/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response body:", result);
      console.log("Payment payload:", payload);

      if (response.ok) {
        alert("✅ Payment Successful!");
        if (guestId && roomId) {
          navigate("/review", {
            state: {
              guestId: parseInt(guestId),
              roomId: parseInt(roomId),
            },
          });
        } else {
          alert("Guest ID or Room ID is missing. Cannot go to review page.");
        }
      } else {
        alert("❌ Payment failed: " + (result.message || "Unknown error"));
      }

    } catch (err) {
      console.error("❌ Network or Server Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="payment-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>💳 Complete Your Payment</h2>

        <input
          type="number"
          name="amount"
          value={payment.amount}
          readOnly
        />

        <select
          name="paymentMethod"
          value={payment.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="debit_card">Debit Card</option>
          <option value="cash">Cash</option>
        </select>

        {(payment.paymentMethod === "credit_card" ||
          payment.paymentMethod === "debit_card") && (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={payment.cardNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cardExpiry"
              placeholder="Expiry Date (MM/YY)"
              value={payment.cardExpiry}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cardCVV"
              placeholder="CVV"
              value={payment.cardCVV}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit">Confirm Payment</button>
      </form>
    </div>
  );
};

export default Payments;
