const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { createBooking, getBookingHistory, getLatestBooking } = require("../controllers/bookingController");

const router = express.Router();

function ensureBookingUserOwnsParam(req, res, next) {
  if (req.params.userId !== req.user.id) {
    return res.status(403).json({ message: "You can only access your own bookings" });
  }
  return next();
}

router.post("/", verifyToken, createBooking);

router.get("/history/:userId", verifyToken, ensureBookingUserOwnsParam, getBookingHistory);

router.get("/latest/:userId", verifyToken, ensureBookingUserOwnsParam, getLatestBooking);

module.exports = router;
