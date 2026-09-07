const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secret = () => process.env.JWT_SECRET || "dev-only-change-me";

function sign(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    secret(),
    { expiresIn: "7d" }
  );
}
function verify(token) {
  return jwt.verify(token, secret());
}
function hash(password) {
  return bcrypt.hash(password, 12);
}
function compare(password, hashValue) {
  return bcrypt.compare(password, hashValue);
}
function auth(req, res, next) {
  const h = req.headers.authorization || "";
  if (!h.startsWith("Bearer ")) return res.status(401).json({ error: "Authentication required" });
  try {
    req.user = verify(h.slice(7));
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}
module.exports = { sign, verify, hash, compare, auth };
