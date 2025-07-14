import {
  getAll,
  getById,
  create,
  update,
  remove as removeUser,
  findByCredentials,
  getGuestIdByUserId,
} from "../models/users.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await getById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const savedUser = await create(req.body);
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Error during signup: " + err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const result = await update(req.params.id, req.body);
    res.json({ message: "User updated successfully", rowsAffected: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await removeUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await findByCredentials(username, password);

    if (!foundUser) return res.status(401).json({ message: "Invalid username or password" });

    const guestId = await getGuestIdByUserId(foundUser.user_id);
    res.json({ userId: foundUser.user_id, guestId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
