import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:5050/api/books')
    .then(response => {
      setBooks(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setError('Failed to fetch books.');
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData()
  }, []);

  console.log(books)
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Book Reviews</h1>
      <div className="book-grid">
        {books.map(book => (
          <Link key={book._id} href={`/books/${book._id}`}>
            <a>
              <div className="book-card">
                <img src={book.coverImage} alt={book.title} />
                <h2>{book.title}</h2>
                <p>{book.author}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .book-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
        }
        .book-card {
          text-align: center;
        }
        img {
          width: 100%; 
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default Home;
