const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

// Environment variable for the API key
const apiKey = process.env.OMDB_API_KEY || "your-api-key";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=Inception`); // Example search for "Inception"
    res.json(response.data); // Send the API response back to the client
  } catch (error) {
    console.error("Error fetching data from OMDb API:", error.message);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.listen(port, () => {
  console.log(`Movie App has started on port ${port}`);
});
