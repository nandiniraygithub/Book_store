/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import BookSingleCard from './BookSingleCard'; // Ensure correct import

const BookCard = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 grid-cols-3 xl:grid-cols-4 gap-4'> {/* Added gap for spacing */}
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />

      ))}
    </div>
  );
};

export default BookCard;
