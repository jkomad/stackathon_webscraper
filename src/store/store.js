import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import animeReducer from "../features/anime/animeSlice";
import gamesReducer from "../features/games/gamesSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
    anime: animeReducer,
    games: gamesReducer,
  },
});

export default store;
