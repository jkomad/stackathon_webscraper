import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, scrapeBooks, selectBooks } from "./booksSlice";

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const handleClick = () => {
    dispatch(scrapeBooks());
  };

  return (
    <>
      <h1>Books</h1>
      <button onClick={handleClick}>Fetch Books</button>
    </>
  );
};

export default Books;
