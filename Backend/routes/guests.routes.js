// routes.js
import { Router } from "express";
const router = Router();
import { getAllGuests, getGuestById, createGuest, updateGuest, deleteGuest } from "../controllers/guests.controller.js";

router.get("/", getAllGuests);
router.get("/:id", getGuestById);
router.post("/", createGuest);
router.put("/:id", updateGuest);
router.delete("/:id", deleteGuest);

export default router;