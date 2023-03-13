import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames, scrapeGames, selectGames } from "./gamesSlice";
import {
  Typography,
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
      <Container
        align="center"
        style={{
          margin: "10px",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
        }}
      >
        <Typography variant="h6">Games (Metacritic)</Typography>
        <Button onClick={handleClick}>Fetch Games</Button>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Rank</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((game) => {
                return (
                  <TableRow>
                    <TableCell>{game.rank}</TableCell>
                    <TableCell>{game.title}</TableCell>
                    <TableCell>{game.score}</TableCell>
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

export default Games;
