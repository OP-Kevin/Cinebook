const mongoose = require("mongoose");

const bookedSeatSchema = new mongoose.Schema(
  {
    showId: { type: Number, required: true, index: true },
    seatNo: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

bookedSeatSchema.index({ showId: 1, seatNo: 1 }, { unique: true });

module.exports = mongoose.model("BookedSeat", bookedSeatSchema);
