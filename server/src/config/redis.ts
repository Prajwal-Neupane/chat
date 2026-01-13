import Redis from "ioredis";
import { env } from "./env";

export const redis = new Redis(env.redisURL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("ready", () => {
  console.log("Redis Ready");
});

redis.on("error", (err) => {
  console.error("Redis error:::::", err);
});
