const jwt = require("jsonwebtoken");
const SECRET = "jwt_secret_key";

const authenticate = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");

  try {
    return jwt.verify(token, SECRET);
  } catch {
    throw new Error("Invalid token");
  }
};

const generateToken = (role) => jwt.sign({ role }, SECRET, { expiresIn: "1h" });

module.exports = { authenticate, generateToken };
