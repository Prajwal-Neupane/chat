import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL!,
  redisURL: process.env.REDIS_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
};
