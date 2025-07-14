import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RoomsDetails.css";

const RoomDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room_id } = useParams();
    

  const [room, setRoom] = useState(location.state?.room || null);
  const [loading, setLoading] = useState(!room);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Room ID from params:", id);
    console.log("Room from location state:", room);   
    if (!room) {
      axios
        .axios.get(`http://localhost:9090/rooms/${room_id}`)
        .then((res) => {
          setRoom(res.data);
          setLoading(false);
          console.log("Room details loaded:", res.data);
        })
        .catch((err) => {
          setError("Failed to load room details.");
          setLoading(false);
          console.error("Error fetching room details:", err);
        });
    }
  }, []);

  // if (loading) return <p>Loading room details...</p>;
  // if (error) return <p>{error}</p>;
  // if (!room) {
  //   return (
  //     <div className="room-details-container">
  //       <h2 className="room-details-title">Room Details</h2>
  //       <p className="room-details-error">❌ No room found.</p>
  //       <button onClick={() => navigate("/rooms")} className="back-btn">Back to Rooms</button>
  //     </div>
  //   );
  // }

  return (
    <div className="room-details-container">
      <h2 className="room-details-title">Room Details</h2>
      <div className="room-details-card">
        <div className="room-details-image-container">
          <img
            src={room.photo_url || "/images/dining.jpg"}
            alt={`Room ${room.room_number}`}
            className="room-details-image"
          />
        </div>
        <div className="room-details-info">
          <h3 className="room-number">Room {room.room_number}</h3>
          <span className="room-type">{room.room_type}</span>
          <div className="room-price">
            <span className="discounted-price">₹{room.price_per_night}</span>
            <span className="taxes">+₹150 taxes & fees per night</span>
          </div>
          <ul className="room-features">
            {(room.features || []).map((feature, index) => (
              <li key={index}>✅ {feature}</li>
            ))}
          </ul>
          <div className="room-status">
            Status: <span className={`status-${room.status}`}>{room.status}</span>
          </div>
          <div className="room-capacity">
            Max Capacity: {room.max_capacity} persons
          </div>
          <button className="book-now-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
