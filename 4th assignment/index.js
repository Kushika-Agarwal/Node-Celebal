// index.js

const express = require("express");
const app = express();
const port = 3000;

//  Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//  Route 1
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

//  Route 2
app.get("/about", (req, res) => {
  res.send("This is the About Page.");
});

//  Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
