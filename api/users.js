import express from "express";
const router = express.Router();

import { createUser, getUserByEmailAndPassword } from "../db/queries/users.js";
import requireBody from "../middleware/requireBody.js";
import { createToken } from "../utils/jwt.js";

router.post(
  "/Register",
  requireBody(["username", "email", "password"]),
  async (req, res) => {
    const { email, username, password } = req.body;
    const user = await createUser(email, username, password);
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  },
);

router.post("/Login", requireBody(["email", "password"]), async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmailAndPassword(email, password);
  if (!user) return res.status(401).send("Invalid credntials.");
  const token = createToken({ id: user.id });
  res.send(token);
});
export default router;
