import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(email, username, password) {
  const sql = `
    INSERT INTO users
    (email, username, password)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [email, username, hashedPassword]);
  return user;
}

export async function getUserByEmailAndPassword(email, password) {
  const sql = `
  SELECT * FROM users 
  WHERE email = $1
  `;

  const {
    rows: [user],
  } = await db.query(sql, [email]);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}

export async function getUserById(id) {
  const sql = `
  SELECT * FROM users WHERE user_id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
