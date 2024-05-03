// Requiring in express and routes directory
const express = require('express');
const routes = require("./routes")

// Setting port and express
const PORT = process.env.PORT || 3001;
const app = express();

// Giving express access
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", routes)

// Listening for port
app.listen(PORT, () => {
  console.log(`Express listening at http://localhost:${PORT}`)
})