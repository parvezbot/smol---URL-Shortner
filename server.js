const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const port = process.env.PORT || 4000;

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const redisConfig = require("./config/redisConfig");

app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 requests per hour
  message: "Too many requests from this IP, please try again in an hour",
});

app.use(limiter);

const shortURLRoute = require("./routes/shortURLRoute");
const loginRoute = require("./routes/loginRoute");

app.use("/", shortURLRoute);
app.use("/", loginRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
