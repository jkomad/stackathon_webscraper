import React from "react";
import Books from "./books/Books";
import Anime from "./anime/Anime";
import Games from "./games/Games";
import Movies from "./movies/Movies";
import { Typography, AppBar, CssBaseline, Container } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline>
        <AppBar position="relative">
          <Typography variant="h6" align="center" style={{ margin: "10px" }}>
            Welcome to the Wonderful World of Webscraping!
          </Typography>
        </AppBar>
        <main>
          <div className="App">
            <Container
              maxWidth={false}
              style={{
                display: "flex",
              }}
            >
              <Books />
              <Anime />
              <Games />
              <Movies />
            </Container>
          </div>
        </main>
      </CssBaseline>
    </>
  );
}

export default App;
