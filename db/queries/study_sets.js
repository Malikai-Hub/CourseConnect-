import db from "#db/client";

export async function createStudySet(
  groupId,
  createdBy,
  studySetTitle,
  studySetDescription,
) {
  const sql = `
    INSERT INTO study_sets (
      group_id,
      created_by,
      study_set_title,
      study_set_description
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const {
    rows: [studySet],
  } = await db.query(sql, [
    groupId,
    createdBy,
    studySetTitle,
    studySetDescription,
  ]);

  return studySet;
}

export async function getStudySets() {
  const sql = `
    SELECT *
    FROM study_sets
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query(sql);
  return rows;
}

export async function getStudySetById(studySetId) {
  const sql = `
    SELECT *
    FROM study_sets
    WHERE study_set_id = $1
  `;

  const {
    rows: [studySet],
  } = await db.query(sql, [studySetId]);

  return studySet;
}

export async function getStudySetsByGroupId(groupId) {
  const sql = `
    SELECT *
    FROM study_sets
    WHERE group_id = $1
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query(sql, [groupId]);
  return rows;
}

export async function getStudySetsByUserId(userId) {
  const sql = `
    SELECT *
    FROM study_sets
    WHERE created_by = $1
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query(sql, [userId]);
  return rows;
}

export async function createStudySet(
  groupId,
  createdBy,
  studySetTitle,
  studySetDescription,
) {
  const sql = `
    INSERT INTO study_sets (
      group_id,
      created_by,
      study_set_title,
      study_set_description
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const {
    rows: [studySet],
  } = await db.query(sql, [
    groupId,
    createdBy,
    studySetTitle,
    studySetDescription,
  ]);

  return studySet;
}

export async function deleteStudySet(studySetId) {
  const sql = `
    DELETE FROM study_sets
    WHERE study_set_id = $1
    RETURNING *
  `;

  const {
    rows: [studySet],
  } = await db.query(sql, [studySetId]);

  return studySet;
}
