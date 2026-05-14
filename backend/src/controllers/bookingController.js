const Booking = require("../models/Booking");
const BookedSeat = require("../models/BookedSeat");

async function createBooking(req, res) {
  try {
    const userId = req.user.id;
    const { showId, movieName, theaterName, date, seats, total } = req.body;

    if (!showId || !movieName || !theaterName || !date || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingSeats = await BookedSeat.find({
      showId: Number(showId),
      seatNo: { $in: seats },
    }).select("seatNo -_id");

    if (existingSeats.length > 0) {
      return res.status(409).json({
        message: "Some seats are already booked",
        seats: existingSeats.map((item) => item.seatNo),
      });
    }

    const seatDocs = seats.map((seatNo) => ({
      showId: Number(showId),
      seatNo,
    }));
    await BookedSeat.insertMany(seatDocs);

    const booking = await Booking.create({
      userId,
      showId: Number(showId),
      movieName,
      theaterName,
      date,
      seats,
      total: Number(total) || 0,
    });

    return res.status(201).json({ message: "Booking saved", booking });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getBookingHistory(req, res) {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    return res.json({ bookings });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getLatestBooking(req, res) {
  try {
    const booking = await Booking.findOne({ userId: req.params.userId }).sort({ createdAt: -1 });
    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
    }
    return res.json({ booking });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  createBooking,
  getBookingHistory,
  getLatestBooking,
};
