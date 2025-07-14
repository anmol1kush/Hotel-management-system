import Reviews from '../models/review.model.js';

export async function getAllReviews(req, res) {
  try {
    const results = await Reviews.getAllReviews();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getReviewById(req, res) {
  try {
    const { id } = req.params;
    const review = await Reviews.getReviewById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addReview(req, res) {
  try {
    const review = req.body;
    await Reviews.addReview(review);
    res.json({ message: 'Review added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateReview(req, res) {
  try {
    const { id } = req.params;
    const updatedReview = req.body;
    const result = await Reviews.updateReview(id, updatedReview);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteReview(req, res) {
  try {
    const { id } = req.params;
    const result = await Reviews.deleteReview(id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
