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
  // Create a unique id
  const id = uuidv4();
  // Create newNote with unique id, title, and text
  const newNote = {id, title, text};
  // Add to the array and rewrite the array with the new information
  db.push(newNote);
  fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => err ? console.error(err) : console.log('success'));
  // Send the new information back
  res.json(db);
});

// router.put("/:id", (req, res) => {
//   res.send("customer PUT route:")
// });

router.delete("/:id", (req, res) => {
  // Look at data and find the index that matches the delete request
  const noteIndex = db.findIndex(note => note.id === req.params.id);
  // If it matches, remove it from the array and rewrite the array
  if(noteIndex !== -1){
    db.splice(noteIndex, 1);
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => err ? console.error(err) : console.log('success'));
    // Send the new information back
  } 
  res.json(db); 
});

// Exporting router
module.exports = router;