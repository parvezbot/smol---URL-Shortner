const mongoose = require("mongoose");
const User = require("./userSchema");

const shortUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

shortUrlSchema.virtual("user", {
  ref: "User",
  localField: "url",
  foreignField: "urls",
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

module.exports = { ShortUrl };
