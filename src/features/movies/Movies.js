import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, scrapeMovies, selectMovies } from "./moviesSlice";
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

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const [fetchedMovies, setFetchedMovies] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
    setFetchedMovies(false);
  }, [fetchedMovies]);

  const handleClick = async () => {
    dispatch(scrapeMovies());
    setFetchedMovies(true);
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
        <Typography variant="h6">Movies (Rotten Tomatoes)</Typography>
        <Button onClick={handleClick}>Fetch Movies</Button>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Tomatometer</TableCell>
                <TableCell align="left">Audience Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => {
                return (
                  <TableRow>
                    <TableCell>{movie.id}</TableCell>
                    <TableCell>{movie.title}</TableCell>
                    <TableCell>{movie.tomatoMeter}</TableCell>
                    <TableCell>{movie.audienceScore}</TableCell>
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

export default Movies;
