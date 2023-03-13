import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import animeReducer from "../features/anime/animeSlice";
import gamesReducer from "../features/games/gamesSlice";
import moviesReducer from "../features/movies/moviesSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
    anime: animeReducer,
    games: gamesReducer,
    movies: moviesReducer,
  },
});

export default store;
