const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const seatRoutes = require("./routes/seatRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();

const defaultOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];
const defaultProdOrigins = [
  "https://cinebook-s53q.onrender.com",
];
const allowedOrigins = [
  ...defaultOrigins,
  ...defaultProdOrigins,
  ...(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
].filter((o, i, arr) => arr.indexOf(o) === i);

function isLocalDevOrigin(origin) {
  if (!origin) return false;
  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function isTrustedPreviewOrigin(origin) {
  if (!origin) return false;
  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "https:") return false;
    // Allow Vercel preview + prod domains.
    return hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    if (isTrustedPreviewOrigin(origin)) {
      return callback(null, true);
    }
    if (process.env.NODE_ENV !== "production" && isLocalDevOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CineBook backend is running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "cinebook-backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/bookings", bookingRoutes);

// Default matches frontend NEXT_PUBLIC_BACKEND_URL (see frontend/.env)
const PORT = process.env.PORT || 5001;

connectDB()
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    console.error("Starting HTTP anyway so CORS/login requests reach the server; fix MONGO_URI if DB fails.");
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
