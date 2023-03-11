import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnime, scrapeAnime, selectAnime } from "./animeSlice";

const Anime = () => {
  const dispatch = useDispatch();
  const anime = useSelector(selectAnime);
  const [animeFetched, setAnimeFetched] = useState(false);

  useEffect(() => {
    dispatch(fetchAnime());
    setAnimeFetched(false);
  }, [animeFetched]);

  const handleClick = () => {
    dispatch(scrapeAnime());
    setAnimeFetched(true);
  };

  return (
    <>
      <h1>Anime</h1>
      <button onClick={handleClick}>Fetch Anime</button>
    </>
  );
};

export default Anime;
