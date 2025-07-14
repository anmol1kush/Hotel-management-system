import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to 🏨 HotelHub</h1>
          <p>Experience luxury and comfort with top-notch services.</p>
          <a href="/rooms" className="btn btn-primary">
            Explore Rooms
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service-card">
            <img src="/images/room.jpg" alt="Rooms" />
            <h3>Luxury Rooms</h3>
            <p>Spacious and elegant rooms with world-class amenities.</p>
          </div>
          <div className="service-card">
            <img src="/images/spa.jpg" alt="Spa" />
            <h3>Spa & Wellness</h3>
            <p>Relax and rejuvenate with our spa treatments.</p>
          </div>
          <div className="service-card">
            <img src="/images/dining.jpg" alt="Dining" />
            <h3>Fine Dining</h3>
            <p>Enjoy multi-cuisine dishes crafted by expert chefs.</p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking">
        <h2>Book Your Stay</h2>
        <p>Reserve your stay now and experience unparalleled luxury.</p>
        <a href="/bookings" className="btn btn-secondary">
          Book Now
        </a>
      </section>
    </div>
  );
};

export default Home;

