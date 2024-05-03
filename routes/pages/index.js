// Requiring in express and path
const router = require("express").Router();
const path = require("path");

// Sending traffic to notes otherwise home if not specified
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../../public/notes.html'))
);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
});

// Exporting router
module.exports = router;