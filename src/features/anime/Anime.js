import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnime, scrapeAnime, selectAnime } from "./animeSlice";
import {
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Anime = () => {
  const dispatch = useDispatch();
  const anime = useSelector(selectAnime);
  const [animeFetched, setAnimeFetched] = useState(false);

  useEffect(() => {
    dispatch(fetchAnime());
    setAnimeFetched(false);
  }, [animeFetched]);

  const handleClick = () => {
    dispatch(scrapeAnime()).then(setAnimeFetched(true));
  };

  return (
    <>
      <Container
        align="center"
        style={{
          margin: "10px",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
        }}
      >
        <Typography variant="h6">Anime (MyAnimeList)</Typography>
        <Button onClick={handleClick}>Fetch Anime</Button>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Rank</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {anime.map((anime) => {
                return (
                  <TableRow>
                    <TableCell>{anime.rank}</TableCell>
                    <TableCell>{anime.title}</TableCell>
                    <TableCell>{anime.rating}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Anime;
