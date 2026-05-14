const BookedSeat = require("../models/BookedSeat");

async function getBookedSeatsByShow(req, res) {
  try {
    const showId = Number(req.params.showId);
    const seats = await BookedSeat.find({ showId }).select("seatNo -_id");
    const bookedSeats = seats.map((item) => item.seatNo);
    return res.json({ bookedSeats });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  getBookedSeatsByShow,
};
