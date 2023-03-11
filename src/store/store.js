import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import animeReducer from "../features/anime/animeSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
    anime: animeReducer,
  },
});

export default store;
