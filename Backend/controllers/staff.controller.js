// controllers/staff.controller.js
import Staff from '../models/staff.model.js';

export function getAllStaff(req, res) {
  Staff.getAllStaff((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
}

export function getStaffById(req, res) {
  const { id } = req.params;
  Staff.getStaffById(id, (err, staff) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json(staff);
  });
}

export function addStaff(req, res) {
  const staff = req.body;
  Staff.addStaff(staff, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Staff added successfully' });
  });
}

export function updateStaff(req, res) {
  const { id } = req.params;
  const staff = req.body;
  Staff.updateStaff(id, staff, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Staff not found' });
    res.json({ message: 'Staff updated successfully' });
  });
}

export function deleteStaff(req, res) {
  const { id } = req.params;
  Staff.deleteStaff(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Staff not found' });
    res.json({ message: 'Staff deleted successfully' });
  });
}
