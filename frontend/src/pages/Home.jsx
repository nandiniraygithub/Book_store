/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/Home/BookTable';
import BooksCard from '../components/Home/BookCard';


const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorMessage("Failed to fetch books. Please try again later."); // Handle error
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4 my-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg"
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg"
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Book List</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl hover:text-sky-500" />
          </Link>
        </div>

        {loading ? (
          <Spinner /> // Show spinner while loading
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p> // Show error message if there's an error
        ) : (
          showType === 'table' ? <BooksTable books={books} /> : <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
