const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    showId: { type: Number, required: true },
    movieName: { type: String, required: true },
    theaterName: { type: String, required: true },
    date: { type: String, required: true },
    seats: { type: [String], required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
