const jwt = require("jsonwebtoken");
const { get } = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Attach user info to request
    next();
  });
}

module.exports = authenticateToken;
