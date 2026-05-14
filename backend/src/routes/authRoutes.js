const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { register, login, logout, getSessionUser, getCurrentUser } = require("../controllers/authController");

const router = express.Router();

function ensureMeParamMatchesToken(req, res, next) {
  if (req.params.userId !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }
  return next();
}

router.post("/register", register);

router.post("/login", login);
router.post("/logout", logout);
router.get("/session", getSessionUser);

router.get("/me/:userId", verifyToken, ensureMeParamMatchesToken, getCurrentUser);

module.exports = router;
