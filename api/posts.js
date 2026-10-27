import express from "express";
import {
  createPost,
  getPostsByGroupId,
  getPostById,
  deletePost,
} from "../db/queries/posts.js";

//Used ai to help me write api
import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";
import { isUserInGroup } from "#db/queries/group.js";

const router = express.Router();

router.use(requireUser);

router.get("/groups/:groupId/posts", async (req, res, next) => {
  try {
    const groupId = Number(req.params.groupId);

    if (!Number.isInteger(groupId) || groupId <= 0) {
      return res.status(400).send("Invalid group ID.");
    }

    if (!(await isUserInGroup(req.user.id, groupId))) {
      return res.status(403).send("You must be a member of this group.");
    }

    const posts = await getPostsByGroupId(groupId);
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/groups/:groupId/posts",
  requireBody(["post_title", "notes"]),
  async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId);
      const { post_title, notes } = req.body;

      if (!Number.isInteger(groupId) || groupId <= 0) {
        return res.status(400).send("Invalid group ID.");
      }

      if (!(await isUserInGroup(req.user.id, groupId))) {
        return res.status(403).send("You must be a member of this group.");
      }

      const post = await createPost(groupId, req.user.id, post_title, notes);

      res.status(201).send(post);
    } catch (error) {
      next(error);
    }
  },
);

router.delete("/posts/:postId", async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);

    if (!Number.isInteger(postId) || postId <= 0) {
      return res.status(400).send("Invalid post ID.");
    }

    const post = await getPostById(postId);

    if (!post) {
      return res.status(404).send("Post not found.");
    }

    if (!(await isUserInGroup(req.user.id, post.group_id))) {
      return res.status(403).send("You must be a member of this group.");
    }

    //Makes it so that only the person who made a post can delete the post
    if (post.user_id !== req.user.id) {
      return res.status(403).send("You can only delete your own posts.");
    }

    await deletePost(postId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
