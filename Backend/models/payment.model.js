import { query } from '../config/db.js'; // Ensure this is a promise pool

export const getAllPayments = async () => {
  const [rows] = await query('SELECT * FROM Payments');
  return rows;
};

export const getPaymentById = async (id) => {
  const [rows] = await query('SELECT * FROM Payments WHERE payment_id = ?', [id]);
  return rows;
};

export const addPayment = async (payment) => {
  const { booking_id, amount, payment_method, status } = payment;
  const payment_date = new Date();
  const sql = 'INSERT INTO Payments (booking_id, amount, payment_method, payment_date, status) VALUES (?, ?, ?, ?, ?)';
  const [result] = await query(sql, [booking_id, amount, payment_method, payment_date, status]);
  return result;
};

export const updatePayment = async (payment_id, payment) => {
  const { booking_id, amount, payment_method, status } = payment;
  const sql = 'UPDATE Payments SET booking_id = ?, amount = ?, payment_method = ?, status = ? WHERE payment_id = ?';
  const [result] = await query(sql, [booking_id, amount, payment_method, status, payment_id]);
  return result;
};

export const deletePayment = async (id) => {
  const [result] = await query('DELETE FROM Payments WHERE payment_id = ?', [id]);
  return result;
};
