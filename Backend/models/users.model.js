import { query } from "../config/db.js";

export const getAll = () => {
  return query("SELECT * FROM Users").then(([rows]) => rows);
};

export const getById = (id) => {
  return query("SELECT * FROM Users WHERE user_id = ?", [id]).then(([rows]) => rows[0]);
};

export const getGuestIdByUserId = (userId) => {
  return query("SELECT guest_id FROM Guests WHERE user_id = ?", [userId])
    .then(([rows]) => (rows.length ? rows[0].guest_id : null));
};

export const findByCredentials = (username, password) => {
  return query("SELECT * FROM Users WHERE email = ? AND password = ?", [username, password])
    .then(([rows]) => rows[0]);
};

export const create = (user) => {
  const { username, password, fullName, email, phone, role } = user;
  return query(
    "INSERT INTO Users (username, password, full_name, email, phone, role) VALUES (?, ?, ?, ?, ?, ?)",
    [username, password, fullName, email, phone, role]
  ).then(([result]) => ({ ...user, userId: result.insertId }));
};

export const update = (id, user) => {
  const { username, password, fullName, email, phone, role } = user;
  return query(
    "UPDATE Users SET username=?, password=?, full_name=?, email=?, phone=?, role=? WHERE user_id=?",
    [username, password, fullName, email, phone, role, id]
  ).then(([result]) => result.affectedRows);
};

export const remove = (id) => {
  return query("DELETE FROM Users WHERE user_id = ?", [id])
    .then(([result]) => result.affectedRows);
};
