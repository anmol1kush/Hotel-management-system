// controllers/rooms.controller.js
import Room from '../models/rooms.model.js';

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.getAllRooms();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.getRoomById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addRoom = async (req, res) => {
  try {
    await Room.addRoom(req.body);
    res.json({ message: 'Room added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const result = await Room.updateRoom(req.params.id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const result = await Room.deleteRoom(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
