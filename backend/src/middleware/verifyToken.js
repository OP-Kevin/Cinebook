const jwt = require("jsonwebtoken");

/**
 * Reads Bearer token, verifies JWT, attaches req.user = { id, email, role }.
 */
function verifyToken(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = header.slice(7).trim();
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is missing in environment");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, secret);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "user",
    };
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    return res.status(401).json({ message: "Authentication failed." });
  }
}

module.exports = verifyToken;
