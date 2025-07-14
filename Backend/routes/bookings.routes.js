import { Router } from 'express';
const router = Router();
import { getAllBookings, getBookingById, addBooking, updateBooking, deleteBooking } from '../controllers/bookings.controller.js';

router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post('/', addBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
