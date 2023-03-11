import "../styles/App.css";
import React from "react";
import Books from "./books/Books";
import Anime from "./anime/Anime";

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Wonderful World of Webscraping!</h1>
      <Books />
      <Anime />
    </div>
  );
}

export default App;
