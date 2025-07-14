import { Router } from 'express';
const router = Router();
import { getAllRooms, getRoomById, addRoom, updateRoom, deleteRoom } from '../controllers/rooms.controller.js';

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', addRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;
