import GuestsModel from "../models/guests.model.js";

export async function getAllGuests(req, res) {
  try {
    const results = await GuestsModel.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getGuestById(req, res) {
  try {
    const guest = await GuestsModel.getById(req.params.id);
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createGuest(req, res) {
  try {
    const savedGuest = await GuestsModel.create(req.body);
    res.status(201).json(savedGuest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateGuest(req, res) {
  try {
    const result = await GuestsModel.update(req.params.id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Guest not found" });
    res.json({ message: "Guest updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteGuest(req, res) {
  try {
    const result = await GuestsModel.remove(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Guest not found" });
    res.json({ message: "Guest deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
