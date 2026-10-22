import express from "express";
const router = express.Router();

import {
  createAssignment,
  getAssignmentsByGroupId,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "../db/queries/assignments.js";

import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";

router.use(requireUser);

router.get("/groups/:groupId/assignments", async (req, res, next) => {
  try {
    const assignments = await getAssignmentsByGroupId(
      Number(req.params.groupId),
    );

    res.send(assignments);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/groups/:groupId/assignments",
  requireBody(["assignment_name", "assignment_description"]),
  async (req, res, next) => {
    try {
      const { assignment_name, assignment_description, due_date } = req.body;

      const assignment = await createAssignment(
        Number(req.params.groupId),
        req.user.id,
        assignment_name,
        assignment_description,
        due_date ?? null,
      );

      res.status(201).send(assignment);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/assignments/:assignmentId", async (req, res, next) => {
  try {
    const assignment = await getAssignmentById(Number(req.params.assignmentId));

    if (!assignment) {
      return res.status(404).send("Assignment not found.");
    }

    res.send(assignment);
  } catch (error) {
    next(error);
  }
});

router.patch("/assignments/:assignmentId", async (req, res, next) => {
  try {
    const assignment = await updateAssignment(
      Number(req.params.assignmentId),
      req.body,
    );

    if (!assignment) {
      return res.status(404).send("Assignment not found.");
    }

    res.send(assignment);
  } catch (error) {
    next(error);
  }
});

router.delete("/assignments/:assignmentId", async (req, res, next) => {
  try {
    await deleteAssignment(Number(req.params.assignmentId));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
