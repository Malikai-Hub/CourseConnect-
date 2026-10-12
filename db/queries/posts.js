import db from "#db/client";

export async function createPost(groupId, userId, postTitle, notes) {
  const sql = `
    INSERT INTO posts (
      group_id,
      user_id,
      post_title,
      notes
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const {
    rows: [post],
  } = await db.query(sql, [groupId, userId, postTitle, notes]);

  return post;
}

export async function getPosts() {
  const sql = `
    SELECT *
    FROM posts
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query(sql);
  return rows;
}

export async function getPostById(postId) {
  const sql = `
    SELECT *
    FROM posts
    WHERE post_id = $1
  `;

  const {
    rows: [post],
  } = await db.query(sql, [postId]);

  return post;
}

export async function getPostsByGroupId(groupId) {
  const sql = `
    SELECT *
    FROM posts
    WHERE group_id = $1
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query(sql, [groupId]);
  return rows;
}

export async function getPostsByUserId(userId) {
  const sql = `
    SELECT *
    FROM posts
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query(sql, [userId]);
  return rows;
}

export async function deletePost(postId) {
  const sql = `
    DELETE FROM posts
    WHERE post_id = $1
    RETURNING *
  `;

  const {
    rows: [post],
  } = await db.query(sql, [postId]);

  return post;
}
