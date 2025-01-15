const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

// API key for OMDb API
const apiKey = "58982b2f";

// Middleware for handling CORS
app.use(cors());

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
    res.json(response.data); // Send the API response back to the client
  } catch (error) {
    console.error("Error fetching data from OMDb API:", error.message);
    res.status(500).send("An error occurred while fetching data.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Movie App has started on port ${port}`);
});
