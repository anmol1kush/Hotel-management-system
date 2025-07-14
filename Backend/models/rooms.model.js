// models/rooms.model.js
import { query } from '../config/db.js';

const Room = {
  getAllRooms: async () => {
    const [rows] = await query('SELECT * FROM rooms');
    return rows;
  },

  getRoomById: async (id) => {
    const [rows] = await query('SELECT * FROM rooms WHERE room_id = ?', [id]);
    return rows.length ? rows[0] : null;
  },

  addRoom: async (room) => {
    const { room_number, room_type, price_per_night, status, max_capacity } = room;
    const sql = 'INSERT INTO rooms (room_number, room_type, price_per_night, status, max_capacity) VALUES (?, ?, ?, ?, ?)';
    const [result] = await query(sql, [room_number, room_type, price_per_night, status, max_capacity]);
    return result;
  },

  updateRoom: async (id, room) => {
    const { room_number, room_type, price_per_night, status, max_capacity } = room;
    const sql = 'UPDATE rooms SET room_number = ?, room_type = ?, price_per_night = ?, status = ?, max_capacity = ? WHERE room_id = ?';
    const [result] = await query(sql, [room_number, room_type, price_per_night, status, max_capacity, id]);
    return result;
  },

  deleteRoom: async (id) => {
    const [result] = await query('DELETE FROM rooms WHERE room_id = ?', [id]);
    return result;
  }
};

export default Room;
