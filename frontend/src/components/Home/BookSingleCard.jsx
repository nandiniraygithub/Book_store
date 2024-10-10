/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import BookModel from './BookModel';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      key={book._id}
      className='border border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
    >
      <h2 className='absolute top-1 right-2 py-1 bg-red-300 rounded-lg'>
        {book.publisher}
      </h2>
      <h4 className='my-2 text-gray-500'>{book._id}</h4>

      <div className='flex justify-start items-center gap-x-2'>
        <FaBook className='text-red-300 text-2xl' />
        <h2 className='my-1'>{book.title}</h2>
      </div>

      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{book.author}</h2>
      </div>

      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiUserCircle
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />

        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>

        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-500 hover:text-black' />
        </Link>

        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-2xl text-red-500 hover:text-black' />
        </Link>
      </div>

      {/* Modal */}
      {showModal && (
        <BookModel book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
