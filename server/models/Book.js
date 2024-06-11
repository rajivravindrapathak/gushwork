const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required:false },
  coverImage: { type: String, required:false },
  averageRating: { type: Number, required:false }
});

const Book = mongoose.model('Book', bookSchema);
  
module.exports = Book;
