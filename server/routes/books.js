const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.post('/addbook', bookController.addBook);
router.get('/:id', bookController.getBookById);
router.get('/:id/reviews', bookController.getReviewsByBookId);
router.post('/:id/reviews', bookController.addReview);

module.exports = router;
