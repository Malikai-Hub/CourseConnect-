import express from "express";
const router = express.Router();

import {
  createAssignment,
  getAssignmentsByGroupId,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getAssignmentsByUserId,
} from "../db/queries/assignments.js";

import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";
import { isUserInGroup } from "#db/queries/group.js";

router.use(requireUser);

router.get("/groups/:groupId/assignments", async (req, res, next) => {
  try {
    const groupId = Number(req.params.groupId);

    if (!(await isUserInGroup(req.user.id, groupId))) {
      return res.status(403).send("You must be a member of this group.");
    }
    const assignments = await getAssignmentsByGroupId(groupId);

    res.send(assignments);
  } catch (error) {
    next(error);
  }
});
router.get("/assignments", async (req, res, next) => {
  try {
    const assignments = await getAssignmentsByUserId(req.user.id);
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
      const groupId = Number(req.params.groupId);

      if (!(await isUserInGroup(req.user.id, groupId))) {
        return res.status(403).send("You must be a member of this group.");
      }
      const assignment = await createAssignment(
        groupId,
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

    if (!(await isUserInGroup(req.user.id, assignment.group_id))) {
      return res.status(403).send("You must be a member of this group.");
    }

    res.send(assignment);
  } catch (error) {
    next(error);
  }
});

//Used ai to help me update this route to help protect existing assignments from being edited or deleted from outside members
router.patch(
  "/assignments/:assignmentId",
  requireBody(["assignment_name", "assignment_description", "due_date"]),
  async (req, res, next) => {
    try {
      const assignmentId = Number(req.params.assignmentId);
      const existingAssignment = await getAssignmentById(assignmentId);

      if (!existingAssignment) {
        return res.status(404).send("Assignment not found.");
      }

      if (!(await isUserInGroup(req.user.id, existingAssignment.group_id))) {
        return res.status(403).send("You must be a member of this group.");
      }

      const assignment = await updateAssignment(
        req.body.assignment_name,
        req.body.assignment_description,
        req.body.due_date,
        assignmentId,
      );

      res.send(assignment);
    } catch (error) {
      next(error);
    }
  },
);

router.delete("/assignments/:assignmentId", async (req, res, next) => {
  try {
    const assignmentId = Number(req.params.assignmentId);
    const assignment = await getAssignmentById(assignmentId);

    if (!assignment) {
      return res.status(404).send("Assignment not found.");
    }

    if (!(await isUserInGroup(req.user.id, assignment.group_id))) {
      return res.status(403).send("You must be a member of this group.");
    }

    await deleteAssignment(assignmentId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
