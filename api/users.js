import express from "express";
const router = express.Router();

import {
  createUser,
  getUserByEmailAndPassword,
  getUserById,
} from "../db/queries/users.js";
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

router.get("/me", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in.");
  }

  const user = await getUserById(req.user.id);

  if (!user) {
    return res.status(404).send("User not found.");
  }

  res.send({
    id: user.id,
    username: user.username,
    email: user.email,
  });
});

export default router;
