import { Router } from "express";
const router = Router();
import { getAllUsers, getUserById, addUser, updateUser, deleteUser, login } from "../controllers/users.controller.js";

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", login);

export default router;
