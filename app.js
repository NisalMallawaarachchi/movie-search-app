const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// API key for OMDb API
const apiKey = "58982b2f";

// Middleware for handling CORS
app.use(cors());

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files (for CSS or other assets)
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to search for movies
app.get("/search", async (req, res) => {
  const movieTitle = req.query.title; // Get the 'title' parameter from the query string

  if (!movieTitle) {
    return res.status(400).send("Please provide a movie title.");
  }

  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
        movieTitle
      )}`
    );

    // Render the results.ejs file and pass the movie data to it
    res.render("results", { movies: response.data.Search, title: movieTitle });
  } catch (error) {
    console.error("Error fetching data from OMDb API:", error.message);
    res.status(500).send("An error occurred while fetching data.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Movie App has started on port ${port}`);
});
