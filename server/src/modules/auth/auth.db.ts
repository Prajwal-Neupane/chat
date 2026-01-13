import { pool } from "../../config/postgres";

export const createUser = async (
  email: string,
  username: string,
  passwordHash: string
) => {
  const result = await pool.query(
    `INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username`,
    [email, username, passwordHash]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const result = await pool.query(
    `SELECT id, email, username, password_hash FROM users WHERE email=$1`,
    [email]
  );
  return result.rows[0];
};
