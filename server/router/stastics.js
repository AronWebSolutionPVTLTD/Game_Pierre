const express = require("express");
const router = express.Router();
const statController = require("../controller/statstics.js");
router.post("/statsData", statController.statsData);
router.get("/getAllStatsData", statController.getAllStatsData);
router.get("/getSingleStatsData/:id", statController.getSingleStatsData);

module.exports = router;