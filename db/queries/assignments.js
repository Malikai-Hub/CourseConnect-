import db from "#db/client.js";

export async function createAssignment(
  groupId,
  createdBy,
  name,
  description,
  dueDate,
) {
  const sql = `
    INSERT INTO assignments (
    group_id, created_by, assignment_name, assignment_description, due_date
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
  const {
    rows: [assignment],
  } = await db.query(sql, [groupId, createdBy, name, description, dueDate]);
  return assignment;
}

export async function getAssignmentById(id) {
  const sql = `
    SELECT * FROM assignments WHERE assignment_id = $1
    ORDER BY due_date ASC
    `;
  const {
    rows: [assignment],
  } = await db.query(sql, [id]);
  return assignment;
}

export async function updateAssignment(
  name,
  description,
  dueDate,
  assignment_id,
) {
  const sql = `
    UPDATE assignments 
    SET
    assignment_name = $1, assignment_description = $2, due_date = $3
    WHERE assignment_id = $4
    RETURNING *
    `;
  const {
    rows: [assignment],
  } = await db.query(sql, [name, description, dueDate, assignment_id]);
  return assignment;
}

//Lets the user mark an assignment as complete or incomplete
export async function markAssignment(is_complete, assignment_id) {
  const sql = `
UPDATE assignments
SET is_complete = $1 WHERE assignment_id = $2
RETURNING *
`;
  const {
    rows: [assignment],
  } = await db.query(sql, [is_complete, assignment_id]);
  return assignment;
}

export async function deleteAssignment(assignment_id) {
  const sql = `
    DELETE FROM assignments WHERE assignment_id = $1
    RETURNING *
    `;
  const {
    rows: [assignment],
  } = await db.query(sql, [assignment_id]);
  return assignment;
}

export async function getAssignmentsByGroupId(groupId) {
  const sql = `
    SELECT *
    FROM assignments
    WHERE group_id = $1
    ORDER BY due_date ASC NULLS LAST
  `;

  const { rows } = await db.query(sql, [groupId]);
  return rows;
}

export async function getAssignmentsByUserId(userId) {
  const sql = `
    SELECT assignments.*, groups.group_title
    FROM assignments
    JOIN group_members
      ON assignments.group_id = group_members.group_id
    JOIN groups
      ON assignments.group_id = groups.group_id
    WHERE group_members.user_id = $1
    ORDER BY assignments.due_date ASC NULLS LAST
  `;

  const { rows } = await db.query(sql, [userId]);
  return rows;
}
