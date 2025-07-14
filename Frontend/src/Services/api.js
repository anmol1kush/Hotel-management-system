import axios from "axios";

const API_BASE_URL = "http://localhost:9090"; // Backend URL

export const getRooms = () => axios.get(`${API_BASE_URL}/rooms`);
export const getUsers = () => axios.get(`${API_BASE_URL}/users`);
export const getGuests = () => axios.get(`${API_BASE_URL}/guests`);
export const getBookings = () => axios.get(`${API_BASE_URL}/bookings`);
export const getPayments = () => axios.get(`${API_BASE_URL}/payments`);
export const getReviews = () => axios.get(`${API_BASE_URL}/reviews`);
export const getStaff = () => axios.get(`${API_BASE_URL}/staff`);
