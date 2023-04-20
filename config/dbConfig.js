const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("mongo db connection successfull");
});
db.on("error", () => {
  console.log("mongo db connection failed");
});
