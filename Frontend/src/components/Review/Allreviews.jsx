import React, { useEffect, useState } from "react";
import "./Review.css";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9090/reviews")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch reviews");
        }
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <div className="review-page-background">
      <div className="review-box">
        <h2 className="review-heading">🌟 Guest Reviews</h2>
        <div className="review-list">
          {reviews.map((rev, index) => (
            <div key={rev.review_id || index} className="review-card">
              <div className="review-left">
                <p className="review-room">Room ID: {rev.room_id}</p>
                <p className="review-stars">
                  {"⭐".repeat(rev.rating)} ({rev.rating}/5)
                </p>
              </div>
              <div className="review-right">
                <p className="review-comment">"{rev.review_text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
