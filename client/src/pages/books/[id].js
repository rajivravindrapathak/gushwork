// // src/pages/books/[id].js

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';

// const BookDetails = () => {
//   const [book, setBook] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({ rating: 1, comment: '' });
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     if (id) {
//       axios.get(`/api/books/${id}`)
//         .then(response => setBook(response.data))
//         .catch(error => console.error(error));
//       axios.get(`/api/books/${id}/reviews`)
//         .then(response => setReviews(response.data))
//         .catch(error => console.error(error));
//     }
//   }, [id]);

//   const submitReview = (e) => {
//     e.preventDefault();
//     axios.post(`/api/books/${id}/reviews`, newReview)
//       .then(response => setReviews([...reviews, response.data]))
//       .catch(error => console.error(error));
//   };

//   if (!book) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{book.title}</h1>
//       <p>{book.author}</p>
//       <p>{book.description}</p>
//       <h2>Reviews</h2>
//       {reviews.map(review => (
//         <div key={review._id}>
//           <p>Rating: {review.rating}</p>
//           <p>{review.comment}</p>
//         </div>
//       ))}
//       <form onSubmit={submitReview}>
//         <label>
//           Rating:
//           <select
//             value={newReview.rating}
//             onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
//           >
//             {[1, 2, 3, 4, 5].map(num => (
//               <option key={num} value={num}>{num}</option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Comment:
//           <textarea
//             value={newReview.comment}
//             onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//           />
//         </label>
//         <button type="submit">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default BookDetails;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 1, comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/books/${id}`)
        .then(response => {
          setBook(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setError('Failed to fetch book details.');
          setLoading(false);
        });
      axios.get(`/api/books/${id}/reviews`)
        .then(response => setReviews(response.data))
        .catch(error => {
          console.error(error);
          setError('Failed to fetch reviews.');
        });
    }
  }, [id]);

  const submitReview = (e) => {
    e.preventDefault();
    if (!newReview.comment) {
      setSubmitError('Comment cannot be empty.');
      return;
    }
    axios.post(`/api/books/${id}/reviews`, newReview)
      .then(response => {
        setReviews([...reviews, response.data]);
        setSubmitSuccess(true);
        setNewReview({ rating: 1, comment: '' });
        setSubmitError(null);
      })
      .catch(error => {
        console.error(error);
        setSubmitError('Failed to submit review.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review._id}>
          <p>Rating: {review.rating}</p>
          <p>{review.comment}</p>
        </div>
      ))}
      <form onSubmit={submitReview}>
        <label>
          Rating:
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
        <label>
          Comment:
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          />
        </label>
        <button type="submit">Submit Review</button>
        {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
        {submitSuccess && <p style={{ color: 'green' }}>Review submitted successfully!</p>}
      </form>
    </div>
  );
};

export default BookDetails;
