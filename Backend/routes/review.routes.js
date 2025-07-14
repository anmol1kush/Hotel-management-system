import { Router } from 'express';
const router = Router();
import { getAllReviews, getReviewById, addReview, updateReview, deleteReview } from '../controllers/review.controller.js';

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.post('/', addReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
