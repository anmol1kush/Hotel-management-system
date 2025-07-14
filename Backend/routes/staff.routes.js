import { Router } from 'express';
const router = Router();
import { getAllStaff, getStaffById, addStaff, updateStaff, deleteStaff } from '../controllers/staff.controller.js';

router.get('/', getAllStaff);
router.get('/:id', getStaffById);
router.post('/', addStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

export default router;
