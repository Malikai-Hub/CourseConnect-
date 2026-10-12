import db from "#db/client";

export async function createFlashcard(studySetId, question, answer) {
  const sql = `
    INSERT INTO flashcards (
      study_set_id,
      question,
      answer
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const {
    rows: [flashcard],
  } = await db.query(sql, [studySetId, question, answer]);

  return flashcard;
}

export async function getFlashcards() {
  const sql = `
    SELECT *
    FROM flashcards
    ORDER BY flashcard_id ASC
  `;

  const { rows } = await db.query(sql);
  return rows;
}

export async function getFlashcardById(flashcardId) {
  const sql = `
    SELECT *
    FROM flashcards
    WHERE flashcard_id = $1
  `;

  const {
    rows: [flashcard],
  } = await db.query(sql, [flashcardId]);

  return flashcard;
}

export async function getFlashcardsByStudySetId(studySetId) {
  const sql = `
    SELECT *
    FROM flashcards
    WHERE study_set_id = $1
    ORDER BY flashcard_id ASC
  `;

  const { rows } = await db.query(sql, [studySetId]);
  return rows;
}

export async function updateFlashcard(flashcardId, question, answer) {
  const sql = `
    UPDATE flashcards
    SET
      question = $2,
      answer = $3
    WHERE flashcard_id = $1
    RETURNING *
  `;

  const {
    rows: [flashcard],
  } = await db.query(sql, [flashcardId, question, answer]);

  return flashcard;
}

export async function deleteFlashcard(flashcardId) {
  const sql = `
    DELETE FROM flashcards
    WHERE flashcard_id = $1
    RETURNING *
  `;

  const {
    rows: [flashcard],
  } = await db.query(sql, [flashcardId]);

  return flashcard;
}
