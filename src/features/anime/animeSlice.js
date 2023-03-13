import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchAnime = createAsyncThunk("anime/fetchAnime", async () => {
  const { data } = await axios.get("/api/anime");
  return data;
});

export const scrapeAnime = createAsyncThunk("anime/scrapeAnime", async () => {
  console.log("Fetching anime...");
  const { data } = await axios.post("/api/anime");
  console.log("Anime fetched!");
  return data;
});

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnime.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(scrapeAnime.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAnime = (state) => state.anime;
export default animeSlice.reducer;
