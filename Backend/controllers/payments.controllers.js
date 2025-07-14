import {
  getAllPayments as fetchAllPayments,
  getPaymentById as fetchPaymentById,
  addPayment as insertPayment,
  updatePayment as modifyPayment,
  deletePayment as removePayment
} from '../models/payment.model.js';

export async function getAllPayments(req, res) {
  try {
    const results = await fetchAllPayments();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving payments' });
  }
}

export async function getPaymentById(req, res) {
  try {
    const id = req.params.id;
    const results = await fetchPaymentById(id);
    if (results.length === 0) return res.status(404).json({ message: 'Payment not found' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving payment' });
  }
}

export async function addPayment(req, res) {
  try {
    const payment = req.body;
    await insertPayment(payment);
    res.json({ message: 'Payment added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding payment' });
  }
}

export async function updatePayment(req, res) {
  try {
    const id = req.params.id;
    const payment = req.body;
    const result = await modifyPayment(id, payment);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Payment updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating payment' });
  }
}

export async function deletePayment(req, res) {
  try {
    const id = req.params.id;
    const result = await removePayment(id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting payment' });
  }
}
