const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const SALT_ROUNDS = 10;
const JWT_EXPIRES = "7d";

function parseCookies(req) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce((acc, part) => {
    const [key, ...rest] = part.trim().split("=");
    if (!key) return acc;
    acc[key] = decodeURIComponent(rest.join("=") || "");
    return acc;
  }, {});
}

function signUserToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role || "user",
    },
    secret,
    { expiresIn: JWT_EXPIRES }
  );
}

/** True if stored password looks like a bcrypt hash */
function isBcryptHash(value) {
  return typeof value === "string" && value.startsWith("$2");
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
    });

    return res.status(201).json({
      message: "Registration successful",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let passwordOk = false;

    if (isBcryptHash(user.password)) {
      passwordOk = await bcrypt.compare(password, user.password);
    } else if (user.password === password) {
      passwordOk = true;
      user.password = await bcrypt.hash(password, SALT_ROUNDS);
      await user.save();
    }

    if (!passwordOk) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let token;
    try {
      token = signUserToken(user);
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ message: "Server configuration error" });
    }

    const safeUser = { _id: user._id, name: user.name, email: user.email };

    return res.json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

function logout(req, res) {
  res.clearCookie("loggedUser", {
    httpOnly: false,
    sameSite: "lax",
  });
  return res.json({ message: "Logout successful" });
}

async function getSessionUser(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7).trim();
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "Server configuration error" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("_id name email role");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      return res.json({
        user: { _id: user._id, name: user.name, email: user.email },
      });
    }

    const cookies = parseCookies(req);
    if (!cookies.loggedUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = JSON.parse(decodeURIComponent(cookies.loggedUser));
    if (!user?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json({ user });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.params.userId).select("_id name email role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  register,
  login,
  logout,
  getSessionUser,
  getCurrentUser,
};
