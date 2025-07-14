// routes/paymentsRoutes.js
import { Router } from 'express';
const router = Router();
import { getAllPayments, getPaymentById, addPayment, updatePayment, deletePayment } from '../controllers/payments.controllers.js';

router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.post('/', addPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

export default router;
