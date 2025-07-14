import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Review.css";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🎯 Get guestId & roomId from state
  const { guestId, roomId } = location.state || {};

  const [review, setReview] = useState({
    rating: 1,
    reviewText: "",
  });

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      guestId: parseInt(guestId),
      roomId: parseInt(roomId),
      rating: parseInt(review.rating),
      reviewText: review.reviewText,
    };

    console.log("Sending Review Payload:", payload);
    console.log("hello");
    console.log(guestId);
    console.log(roomId);

    try {
      const response = await fetch("http://localhost:9090/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      console.log("Review Response (raw):", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        console.log("Response is not valid JSON, using raw text...");
        result = { message: text };
      }

      if (response.ok) {
        alert("Thank you for your review! 🎉");
        navigate("/");
      } else {
        alert("Failed to submit review: " + result.message);
      }
    } catch (err) {
      console.error("Error while submitting review:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="review-container">
      <form className="review-form" onSubmit={handleSubmit}>
        <h2>📝 Submit Your Review</h2>

        <p>Guest ID: {guestId}</p>
        <p>Room ID: {roomId}</p>

        <label>Rating (1-5):</label>
        <select
          name="rating"
          value={review.rating}
          onChange={handleChange}
          required
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>

        <textarea
          name="reviewText"
          placeholder="Write your review here..."
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Review;
