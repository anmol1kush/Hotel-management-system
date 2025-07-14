// models/booking.model.js
import { query } from '../config/db.js';

export async function createBooking(booking) {
  console.log("createBooking payload:", booking);

  const [result] = await query(
    `INSERT INTO Bookings (guest_id, room_id, check_in_date, check_out_date, total_price)
     VALUES (?, ?, ?, ?, ?)`,
    [
      booking.guest_id,
      booking.room_id,
      booking.check_in_date,
      booking.check_out_date,
      booking.total_price
    ]
  );

  return result.insertId;
}


export async function getAllBookings() {
  const [rows] = await query(`SELECT * FROM Bookings`);
  return rows;
}

export async function getBookingById(id) {
  const [rows] = await query(`SELECT * FROM Bookings WHERE booking_id = ?`, [id]);
  return rows[0];
}

export async function updateBooking(booking) {
  const [result] = await query(
    `UPDATE Bookings SET guest_id = ?, room_id = ?, check_in_date = ?, check_out_date = ?, total_price = ?
     WHERE booking_id = ?`,
    [booking.guest_id, booking.room_id, booking.check_in_date, booking.check_out_date, booking.total_price, booking.booking_id]
  );
  return result.affectedRows;
}

export async function deleteBooking(id) {
  const [result] = await query(`DELETE FROM Bookings WHERE booking_id = ?`, [id]);
  return result.affectedRows;
}
