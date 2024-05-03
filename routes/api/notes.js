// Requiring in express and database
const router = require("express").Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require("../../db/db.json");
const dbPath = "./db/db.json";

// Listening for requests
router.get("/", (req, res) => {
  res.send(db)
});

// router.get("/:id", (req, res) => {
//   res.send("customer GET route:")
// });

router.post("/", (req, res) => {
  // Set the req.body which is title and text to variables title/text
  const {title, text} = req.body;
  // Read data from database
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  // Create a unique id
  const id = uuidv4();
  // Create newNote with unique id, title, and text
  const newNote = {id, title, text};
  // Add to the array and rewrite the array with the new information
  data.push(newNote);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  // Send the new information back
  res.json(data);
});

// router.put("/:id", (req, res) => {
//   res.send("customer PUT route:")
// });

router.delete("/:id", (req, res) => {
  // Read file and parse the information
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  // Look at data and find the index that matches the delete request
  const noteIndex = data.findIndex(note => note.id === req.params.id);
  // If it matches, remove it from the array and rewrite the array
  if(noteIndex !== -1){
    data.splice(noteIndex, 1);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    // Send the new information back
    res.json(data);
  } 
});

// Exporting router
module.exports = router;