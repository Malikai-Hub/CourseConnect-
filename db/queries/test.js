import db from "#db/client";

export async function createTest(studySetId, testTitle) {
  const sql = `
    INSERT INTO tests (
      study_set_id,
      test_title
    )
    VALUES ($1, $2)
    RETURNING *
  `;

  const {
    rows: [test],
  } = await db.query(sql, [studySetId, testTitle]);

  return test;
}

export async function getTests() {
  const sql = `
    SELECT *
    FROM tests
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query(sql);
  return rows;
}

export async function getTestById(testId) {
  const sql = `
    SELECT *
    FROM tests
    WHERE test_id = $1
  `;

  const {
    rows: [test],
  } = await db.query(sql, [testId]);

  return test;
}

export async function getTestsByStudySetId(studySetId) {
  const sql = `
    SELECT *
    FROM tests
    WHERE study_set_id = $1
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query(sql, [studySetId]);
  return rows;
}

export async function deleteTest(testId) {
  const sql = `
    DELETE FROM tests
    WHERE test_id = $1
    RETURNING *
  `;

  const {
    rows: [test],
  } = await db.query(sql, [testId]);

  return test;
}
