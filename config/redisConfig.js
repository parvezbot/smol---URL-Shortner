const redis = require("redis");
require("dotenv").config();

let redisClient;

(async () => {
  redisClient = redis.createClient({
    url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
  });

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  await redisClient.connect();

  await redisClient.set("key", "value");
  console.log("Redis Connected!");
  const value = await redisClient.get("key");
  console.log(value);
})();

module.exports = { redisClient };
