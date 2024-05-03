// Requiring in express, api, and pages 
const router = require("express").Router();
const apiRoutes = require("./api");
const pageRoutes = require("./pages");

// Sending express to correct location
router.use("/api", apiRoutes);
router.use("/", pageRoutes);

// Exporting router
module.exports = router