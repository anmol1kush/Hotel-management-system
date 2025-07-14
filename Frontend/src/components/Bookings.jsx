import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Bookings.css";

// 🧼 Normalize backend data to camelCase
const normalizeRoom = (data) => ({
  roomId: data.room_id,
  roomNumber: data.room_number,
  roomType: data.room_type,
  pricePerNight: parseFloat(data.price_per_night),
  photoUrl: data.photo_url,
  status: data.status,
  maxCapacity: data.max_capacity,
});

const Bookings = () => {
  const { room_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedRoom, setSelectedRoom] = useState(
    location.state?.room ? normalizeRoom(location.state.room) : null
  );

  const [booking, setBooking] = useState({
    guestId: null,
    roomId: null,
    checkInDate: "",
    checkOutDate: "",
    totalPrice: 0,
  });

  useEffect(() => {
    console.log("Room ID from params:", room_id);
    console.log("Room from location state:", selectedRoom);

    if (!selectedRoom) {
      axios
        .get(`http://localhost:9090/rooms/${room_id}`)
        .then((response) => {
          setSelectedRoom(normalizeRoom(response.data));
        })
        .catch((err) => console.error("Room fetch failed", err));
    }
  }, [room_id, selectedRoom]);

  useEffect(() => {
    if (selectedRoom) {
      const guestIdFromStorage = localStorage.getItem("guestId");

      if (!guestIdFromStorage) {
        alert("Please login to make a booking");
        navigate("/login");
        return;
      }

      setBooking((prev) => ({
        ...prev,
        guestId: parseInt(guestIdFromStorage),
        roomId: selectedRoom.roomId,
      }));
    }
  }, [selectedRoom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotalPrice = () => {
    const pricePerNight = selectedRoom?.pricePerNight || 0;
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);

    if (checkOut > checkIn) {
      const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
      return nights * pricePerNight + 150;
    }
    return 0;
  };

 const handleConfirmBooking = (e) => {
  e.preventDefault();
  const totalPrice = calculateTotalPrice();

  if (totalPrice > 0) {
    const payload = {
      guest_id: booking.guestId,
      room_id: booking.roomId,
      check_in_date: new Date(booking.checkInDate).toISOString(),
      check_out_date: new Date(booking.checkOutDate).toISOString(),
      total_price: totalPrice.toFixed(2),
    };

    console.log("Booking payload:", payload); // ✅ DEBUG

    axios
      .post("http://localhost:9090/bookings", payload)
      .then((response) => {
        const bookingId = response.data.bookingId; // ✅ correct key

        setBooking((prev) => ({
          ...prev,
          bookingId: bookingId,
        }));

        navigate(
          `/payments?amount=${totalPrice}&guestId=${booking.guestId}&roomId=${booking.roomId}&bookingId=${bookingId}`
        );
      })
      .catch((error) => {
        console.error("Booking failed:", error);
        alert("Booking failed ❌ Please check your input or try again.");
      });
  } else {
    alert("Please select valid check-in and check-out dates.");
  }
};


  return (
    <div className="booking-container">
      <div className="booking-box">
        <h2>📅 Book Your Stay</h2>

        {selectedRoom ? (
          <div className="room-summary">
            <img
              src={selectedRoom.photoUrl || "/images/dining.jpg"}
              alt="Room"
              className="room-summary-image"
            />
            <h3>
              Room {selectedRoom.roomNumber} - {selectedRoom.roomType}
            </h3>
            <p>Price/Night: ₹{selectedRoom.pricePerNight} + ₹150 Taxes</p>
            <p>Capacity: {selectedRoom.maxCapacity}</p>
            <p>Status: {selectedRoom.status}</p>
          </div>
        ) : (
          <p>Loading room details...</p>
        )}

        <form className="booking-form" onSubmit={handleConfirmBooking}>
          <label>Check-in Date</label>
          <input
            type="date"
            name="checkInDate"
            value={booking.checkInDate}
            onChange={handleChange}
            required
          />

          <label>Check-out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={booking.checkOutDate}
            onChange={handleChange}
            required
          />

          <div className="price-display">
            Total Price: ₹{calculateTotalPrice()}
          </div>

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default Bookings;
