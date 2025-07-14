import { query } from '../config/db.js';

const Reviews = {
  addReview: async (review) => {
    const { guest_id, room_id, rating, review_text } = review;
    const sql = 'INSERT INTO Reviews (guest_id, room_id, rating, review_text) VALUES (?, ?, ?, ?)';
    const [result] = await query(sql, [guest_id, room_id, rating, review_text]);
    return result;
  },

  getAllReviews: async () => {
    const [rows] = await query('SELECT * FROM Reviews');
    return rows;
  },

  getReviewById: async (id) => {
    const [rows] = await query('SELECT * FROM Reviews WHERE review_id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  updateReview: async (id, review) => {
    const { guest_id, room_id, rating, review_text } = review;
    const sql = 'UPDATE Reviews SET guest_id = ?, room_id = ?, rating = ?, review_text = ? WHERE review_id = ?';
    const [result] = await query(sql, [guest_id, room_id, rating, review_text, id]);
    return result;
  },

  deleteReview: async (id) => {
    const [result] = await query('DELETE FROM Reviews WHERE review_id = ?', [id]);
    return result;
  }
};

export default Reviews;
