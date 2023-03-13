import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const { data } = await axios.get("/api/movies");
  return data;
});

export const scrapeMovies = createAsyncThunk(
  "movies/scrapeMovies",
  async () => {
    console.log("Fetching movies...");
    const { data } = await axios.post("/api/movies");
    console.log("Movies fetched!");
    return data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      return action.payload;
    }),
      builder.addCase(scrapeMovies.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectMovies = (state) => state.movies;
export default moviesSlice.reducer;
