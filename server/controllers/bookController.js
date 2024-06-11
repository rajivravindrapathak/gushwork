const Book = require('../models/Book');
const Review = require('../models/Review');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};


exports.addBook = async (req, res) => {
  try {
    const { title, author, description, coverImage, averageRating } = req.body;
    const newBook = new Book({ title, author, description, coverImage, averageRating });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

exports.getReviewsByBookId = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.id });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = new Review({ bookId: req.params.id, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};
