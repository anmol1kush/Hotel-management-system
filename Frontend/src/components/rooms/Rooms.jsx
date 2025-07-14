import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9090/rooms")
      .then(response => setRooms(response.data))
      .catch(error => console.error("Error fetching rooms:", error));
  }, []);

  const handleViewDetails = (room) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      alert("Please login to view detail");
      navigate("/login");
      return;
    }
    console.log("Room details:", room);
    console.log("Navigating to room details for room ID:", room.room_id);
    console.log("Room number:", room.room_number);
  
    
    navigate(`/rooms/${room.room_id}`, { state: { room } });

  };

  return (
    <div className="rooms-container">
      <h2 className="rooms-title">Available Rooms</h2>
     {rooms.map((room) => (
  <div key={room.room_id} className="hotel-card">
    <div className="hotel-image-container">
      <img 
        src={room.photo_url || "/images/dining.jpg"} 
        alt={`Room ${room.room_number}`} 
        className="hotel-image" 
      />
    </div>
    <div className="hotel-info">
      <div className="room-info-container">
        <div className="room-left">
          <h3 className="hotel-name">Room {room.room_number}</h3>
          <p className="included-service">✅ Wifi Available</p>
          <p className="included-service">✅ Food Included</p>
          <p className="included-service">✅ Spa Included</p>
        </div>
        <div className="room-right">
          <span className="room-type">{room.room_type}</span>
          <span className="room-status">{room.status}</span>
          <span className="room-capacity">Max: {room.max_capacity}</span>
        </div>
      </div>
      <div className="hotel-pricing">
        <div className="hotel-price">
          <span className="discounted-price">₹{room.price_per_night}</span>
          <span className="taxes">+₹150 taxes & fees per night</span>
        </div>
      </div>

      <button className="details-btn" onClick={() => handleViewDetails(room)}>
        View Details
      </button>
    </div>
  </div>
))}

    </div>
  );
};

export default Rooms;
