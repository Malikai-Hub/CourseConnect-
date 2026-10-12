import db from "#db/client";

export async function createGroup(userId, date, description, title) {
  const sql = `
    INSERT INTO groups
    (creator_id, created_date, group_description, group_title)
    VALUES 
    ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [group],
  } = await db.query(sql, [userId, date, description, title]);
  return group;
}

// Gets a specific group that a user belongs to
export async function getGroupByUserId(userId, groupId) {
  const sql = `
SELECT groups.*
FROM groups JOIN group_members ON groups.group_id = group_members.group_id WHERE group_members.user_id = $1 AND groups.group_id = $2
`;

  const {
    rows: [group],
  } = await db.query(sql, [userId, groupId]);
  return group;
}
// Gets all groups that a user belongs to
export async function getGroupsByUserId(userId) {
  const sql = `
    SELECT groups.* FROM groups JOIN group_members ON groups.group_id = group_members.group_id WHERE group_members.user_id = $1
    `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

export async function addUserToGroup(userId, groupId) {
  const sql = `
    INSERT INTO group_members
    (group_id, user_id)
    VALUES ($1, $2)
    RETURNING *
    `;
  const {
    rows: [member],
  } = await db.query(sql, [userId, groupId]);
  return member;
}

export async function removeUserFromGroup(userId, groupId) {
  const sql = `
DELETE FROM group_members WHERE group_id = $1
AND user_id = $2
RETURNING *
`;
  const {
    rows: [member],
  } = await db.query(sql, [userId, groupId]);
  return member;
}
