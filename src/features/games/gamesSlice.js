import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
  const { data } = await axios.get("/api/games");
  return data;
});

export const scrapeGames = createAsyncThunk("games/scrapeGames", async () => {
  console.log("Fetching games...");
  const { data } = await axios.post("/api/games");
  console.log("Games fetched!");
  return data;
});

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      return action.payload;
    }),
      builder.addCase(scrapeGames.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectGames = (state) => state.games;
export default gamesSlice.reducer;
