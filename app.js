import express from "express";
import cors from "cors";

import getUserFromToken from "./middleware/getUserFromToken.js";

import groupsRouter from "./api/groups.js";
import usersRouter from "./api/users.js";
import assignmentsRouter from "./api/assignments.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
import postsRouter from "./api/posts.js";
import cors from "cors";
const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());

app.use(getUserFromToken);

app.use("/api/groups", groupsRouter);
app.use("/api/users", usersRouter);
app.use("/api", assignmentsRouter);

app.use("/api", postsRouter);
export default app;
