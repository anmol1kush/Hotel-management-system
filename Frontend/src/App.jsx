import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct import
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from "./components/Home";
import Login from "./components/auth/Login"
import Rooms from "./components/rooms/Rooms"
import RoomsDetails from "./components/rooms/RoomsDetails"
import Contact from "./components/Contact"
import Signup from "./components/auth/Signup";
import GuestSignup from "./components/auth/GuestSignup";
import StaffSignup from "./components/auth/StaffSignup";
import Bookings from "./components/Bookings";
import Review from "./components/Review/Review";
import Payment from "./components/payments/payments"
import AllReviews from "./components/Review/Allreviews";


function App() { 
  return (
    <>
      {/* Wrap everything inside Router */}
      <Router>
        {/* Pass refs correctly if needed */}
        <Navbar />

        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>ℹ️ About Us</h1>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/bookings" element={<Bookings />} /> */}

          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:room_id" element={<Bookings />} />
          <Route path="/payments" element={<Payment/> } />


          <Route path="/" element={<Signup />} />
          <Route path="/guest-signup" element={<GuestSignup />} />
          <Route path="/staff-signup" element={<StaffSignup />} />
          <Route path="/review" element={ <Review/>} />
          <Route path="allreviews" element={<AllReviews/>} />
        </Routes>

        {/* Add Footer here if needed */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
