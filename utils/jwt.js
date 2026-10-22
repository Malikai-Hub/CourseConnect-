// Used the market solution as a reference

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function createToken(user) {
  return jwt.sign(user, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
