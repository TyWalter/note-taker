// Requiring in express and notes
const router = require("express").Router();
const notes = require("./notes")

// Sending traffic to notes
router.use("/notes", notes);

// Exporting router
module.exports = router;