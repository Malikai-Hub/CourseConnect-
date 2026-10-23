import express from "express";
import {
  createGroup,
  getGroupByUserId,
  getGroupsByUserId,
  addUserToGroup,
  removeUserFromGroup,
  searchGroups,
  getGroupById,
  getAllGroups,
} from "../db/queries/group.js";
import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";

const router = express.Router();

router.post(
  "/",
  requireUser,
  requireBody(["group_title", "group_description"]),
  async (req, res) => {
    const { group_title, group_description } = req.body;

    const group = await createGroup(
      req.user.id,
      new Date().toISOString().slice(0, 10),
      group_description,
      group_title,
    );

    await addUserToGroup(req.user.id, group.group_id);

    res.status(201).send(group);
  },
);

//Gets all groups the user belongs to
router.get("/", requireUser, async (req, res) => {
  const groups = await getGroupsByUserId(req.user.id);
  res.send(groups);
});

router.get("/search", async (req, res) => {
  const search = req.query.q?.trim();
  if (!search) {
    return res.status(400).send({
      error: "Please try searching for group.",
    });
  }

  const groups = await searchGroups(search);

  res.send(groups);
});

router.get("/browse", async (req, res) => {
  const groups = await getAllGroups();
  res.send(groups);
});

// Gets details for a specific group
router.get("/:groupId", async (req, res) => {
  const groupId = Number(req.params.groupId);

  if (!Number.isInteger(groupId) || groupId <= 0) {
    return res.status(400).send({
      error: "Group ID must be a positive integer.",
    });
  }

  const group = await getGroupById(groupId);

  if (!group) {
    return res.status(404).send({
      error: "Group not found.",
    });
  }

  res.send(group);
});

//Used ai to help with this function
router.post("/:groupId/members", requireUser, async (req, res) => {
  const groupId = Number(req.params.groupId);

  if (!Number.isInteger(groupId) || groupId <= 0) {
    return res.status(400).send({
      error: "Group ID must be a positive integer.",
    });
  }

  const group = await getGroupById(groupId);

  if (!group) {
    return res.status(404).send({
      error: "Group not found.",
    });
  }

  const member = await addUserToGroup(req.user.id, groupId);

  if (!member) {
    return res.status(409).send({
      error: "You are already a member of this group.",
    });
  }

  res.status(201).send(member);
});

router.delete("/:groupId/members/me", requireUser, async (req, res) => {
  const groupId = Number(req.params.groupId);

  if (!Number.isInteger(groupId) || groupId <= 0) {
    return res.status(400).send({
      error: "Group ID must be a positive integer.",
    });
  }

  const group = await getGroupById(groupId);

  if (!group) {
    return res.status(404).send({
      error: "Group not found.",
    });
  }

  const member = await removeUserFromGroup(req.user.id, groupId);

  if (!member) {
    return res.status(404).send({
      error: "You are not a member of this group.",
    });
  }

  res.sendStatus(204);
});

export default router;
