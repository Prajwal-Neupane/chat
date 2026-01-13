import { pool } from "../config/postgres";

export async function createUser(
  email: string,
  username: string,
  passwordHash: string
) {
  const result = await pool.query(
    `INSERT INTO users (email, username, passwordHash) VALUES ($1, $2, $3) RETURNING id, email, username`,
    [email, username, passwordHash]
  );

  return result.rows[0];
}
