import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames, scrapeGames, selectGames } from "./gamesSlice";

const Games = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectGames);
  const [fetchedGames, setFetchedGames] = useState(false);

  useEffect(() => {
    dispatch(fetchGames());
    setFetchedGames(false);
  }, [fetchedGames]);

  const handleClick = async () => {
    dispatch(scrapeGames());
    setFetchedGames(true);
  };

  return (
    <>
      <h1>Games</h1>
      <button onClick={handleClick}>Fetch Games</button>
    </>
  );
};

export default Games;
