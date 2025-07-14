// models/staff.model.js
import { query } from '../config/db.js';

const Staff = {
  addStaff: (staff, callback) => {
    const { user_id, full_name, position, email, phone, salary, hire_date } = staff;
    const sql = `
      INSERT INTO Staff (user_id, full_name, position, email, phone, salary, hire_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    query(sql, [user_id, full_name, position, email, phone, salary, hire_date], callback);
  },

  getAllStaff: (callback) => {
    query('SELECT * FROM Staff', callback);
  },

  getStaffById: (id, callback) => {
    query('SELECT * FROM Staff WHERE staff_id = ?', [id], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  },

  updateStaff: (id, staff, callback) => {
    const { user_id, full_name, position, email, phone, salary, hire_date } = staff;
    const sql = `
      UPDATE Staff SET user_id=?, full_name=?, position=?, email=?, phone=?, salary=?, hire_date=?
      WHERE staff_id=?
    `;
    query(sql, [user_id, full_name, position, email, phone, salary, hire_date, id], callback);
  },

  deleteStaff: (id, callback) => {
    query('DELETE FROM Staff WHERE staff_id = ?', [id], callback);
  }
};

export default Staff;
