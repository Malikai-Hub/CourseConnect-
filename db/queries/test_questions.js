import db from "#db/client.js";

export async function createTestQuestion(testId, question, correctAnswer) {
  const sql = `
    INSERT INTO test_questions (
      test_id,
      question,
      correct_answer
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const {
    rows: [newQuestion],
  } = await db.query(sql, [testId, question, correctAnswer]);

  return newQuestion;
}

export async function getTestQuestions() {
  const sql = `
    SELECT *
    FROM test_questions
    ORDER BY question_id ASC
  `;

  const { rows } = await db.query(sql);
  return rows;
}

export async function getTestQuestionById(questionId) {
  const sql = `
    SELECT *
    FROM test_questions
    WHERE question_id = $1
  `;

  const {
    rows: [question],
  } = await db.query(sql, [questionId]);

  return question;
}

export async function getTestQuestionsByTestId(testId) {
  const sql = `
    SELECT *
    FROM test_questions
    WHERE test_id = $1
    ORDER BY question_id ASC
  `;

  const { rows } = await db.query(sql, [testId]);
  return rows;
}

export async function updateTestQuestion(questionId, question, correctAnswer) {
  const sql = `
    UPDATE test_questions
    SET
      question = $2,
      correct_answer = $3
    WHERE question_id = $1
    RETURNING *
  `;

  const {
    rows: [updatedQuestion],
  } = await db.query(sql, [questionId, question, correctAnswer]);

  return updatedQuestion;
}

export async function deleteTestQuestion(questionId) {
  const sql = `
    DELETE FROM test_questions
    WHERE question_id = $1
    RETURNING *
  `;

  const {
    rows: [deletedQuestion],
  } = await db.query(sql, [questionId]);

  return deletedQuestion;
}
