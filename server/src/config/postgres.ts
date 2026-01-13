import { Pool } from "pg";
import { env } from "../config/env";

export const pool = new Pool({
  connectionString: env.databaseURL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  console.log("PostgresSql connected");
});

pool.on("error", (err) => {
  console.log("Unexpected Error occured: ", err);
  process.exit(1);
});
