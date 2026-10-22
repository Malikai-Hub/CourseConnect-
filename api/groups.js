import express from "express";
import {
  createGroup,
  getGroupByUserId,
  getGroupsByUserId,
  addUserToGroup,
  removeUserFromGroup,
} from "../db/queries/group.js";
import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";

const router = express.Router();

router.use(requireUser);

router.post(
  "/",
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
router.get("/", async (req, res) => {
  const groups = await getGroupsByUserId(req.user.id);
  res.send(groups);
});

//Gets a specific group the user belongs to
router.param("groupId", async (req, res, next, groupId) => {
  const group = await getGroupByUserId(req.user.id, Number(groupId));

  if (!group) return res.status(404).send("Group not found");

  req.group = group;
  next();
});

router.get("/:groupId", (req, res) => {
  res.send(req.group);
});

router.post("/:groupId/members", async (req, res) => {
  const member = await addUserToGroup(req.user.id, Number(req.params.groupId));

  res.status(201).send(member);
});

router.delete("/:groupId/members/me", async (req, res) => {
  const member = await removeUserFromGroup(
    req.user.id,
    Number(req.params.groupId),
  );

  if (!member) {
    return res.status(404).send("You are not a member of this group");
  }

  res.sendStatus(204);
});

export default router;
