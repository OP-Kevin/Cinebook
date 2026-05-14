const express = require("express");
const { getBookedSeatsByShow } = require("../controllers/seatController");

const router = express.Router();

router.get("/:showId", getBookedSeatsByShow);

module.exports = router;
