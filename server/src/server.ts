import { app } from "./app";
import { env } from "./config/env";
import { pool } from "./config/postgres";
import { redis } from "./config/redis";

async function startServer() {
  try {
    await pool.query("SELECT 1"); //test db
    console.log("Database Ready");

    // Test Redis
    await redis.ping();
    console.log("Redis ready");
    app.listen(env.port, () => {
      console.log(`Server is running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
}

startServer();
