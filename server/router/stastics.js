const express = require("express");
const router = express.Router();
const statController = require("../controller/stastics");
router.post("/statsData", statController.statsData);
router.get("/getAllStatsData", statController.getAllStatsData);
router.get("/getSingleStatsData/:id", statController.getSingleStatsData);

module.exports = router;