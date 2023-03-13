import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = [];

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const { data } = await axios.get("/api/books");
  return data;
});

export const scrapeBooks = createAsyncThunk("books/scrapeBooks", async () => {
  console.log("Fetching books...");
  const { data } = await axios.post("/api/books");
  console.log("Books fetched!");
  return data;
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(scrapeBooks.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectBooks = (state) => state.books;
export default booksSlice.reducer;
