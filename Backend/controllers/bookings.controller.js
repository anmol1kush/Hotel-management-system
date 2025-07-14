import {
  getAllBookings as fetchAllBookings,
  getBookingById as fetchBookingById,
  createBooking,
  updateBooking as updateBookingInDb,
  deleteBooking as deleteBookingFromDb
} from '../models/bookings.model.js';

// Get all bookings
export async function getAllBookings(req, res) {
  try {
    const bookings = await fetchAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}

// Get booking by ID
export async function getBookingById(req, res) {
  try {
    const booking = await fetchBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving booking' });
  }
}

// Add a new booking
function formatDateToMySQL(isoString) {
  const date = new Date(isoString);
  return date.toISOString().slice(0, 19).replace('T', ' '); // MySQL format
}

export async function addBooking(req, res) {
  try {
    let { guest_id, room_id, check_in_date, check_out_date, total_price } = req.body;

    if (!guest_id || !room_id || !check_in_date || !check_out_date || !total_price) {
      return res.status(400).json({ error: 'Missing required booking fields' });
    }

    // ✅ Format dates
    check_in_date = formatDateToMySQL(check_in_date);
    check_out_date = formatDateToMySQL(check_out_date);

    const bookingPayload = {
      guest_id,
      room_id,
      check_in_date,
      check_out_date,
      total_price
    };

    const bookingId = await createBooking(bookingPayload);
    res.status(200).json({ bookingId });
  } catch (err) {
    console.error('Failed to add booking:', err);
    res.status(500).json({ error: 'Failed to add booking', details: err.message });
  }
}




// Update booking
export async function updateBooking(req, res) {
  try {
    const result = await updateBookingInDb({ ...req.body, booking_id: req.params.id });
    if (result > 0) {
      res.status(200).json({ message: 'Booking updated successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
}

// Delete booking
export async function deleteBooking(req, res) {
  try {
    const result = await deleteBookingFromDb(req.params.id);
    if (result > 0) {
      res.status(200).json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
}
