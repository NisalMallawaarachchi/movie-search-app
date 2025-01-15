const express = require("express");
const app = express();
const port = 3000;
const request = require("request");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Movie App has started on port ${port}`);
});
