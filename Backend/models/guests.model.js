import { query } from "../config/db.js";

const GuestsModel = {
  getAll: async () => {
    const [rows] = await query("SELECT * FROM Guests");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await query("SELECT * FROM Guests WHERE guest_id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  create: async (guest) => {
    const sql = `
      INSERT INTO Guests (user_id, address, city, country, id_proof_type, id_proof_number)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      guest.userId,
      guest.address,
      guest.city,
      guest.country,
      guest.idProofType,
      guest.idProofNumber,
    ];
    const [result] = await query(sql, values);
    return { ...guest, guestId: result.insertId };
  },

  update: async (id, guest) => {
    const sql = `
      UPDATE Guests
      SET address = ?, city = ?, country = ?, id_proof_type = ?, id_proof_number = ?
      WHERE guest_id = ?
    `;
    const values = [
      guest.address,
      guest.city,
      guest.country,
      guest.idProofType,
      guest.idProofNumber,
      id,
    ];
    const [result] = await query(sql, values);
    return result;
  },

  remove: async (id) => {
    const [result] = await query("DELETE FROM Guests WHERE guest_id = ?", [id]);
    return result;
  },
};

export default GuestsModel;
