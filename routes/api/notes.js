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
  const {title, text} = req.body;
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const id = uuidv4();
  const newNote = {
    id,
    title,
    text
  };
  data.push(newNote);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.json(data);
});

// router.put("/:id", (req, res) => {
//   res.send("customer PUT route:")
// });

router.delete("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const noteIndex = data.findIndex(note => note.id === req.params.id);
  if(noteIndex !== -1){
    data.splice(noteIndex, 1);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    res.json(data);
  } 
});

// Exporting router
module.exports = router;