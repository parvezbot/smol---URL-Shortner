const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/userSchema");
const { ShortUrl } = require("../models/urlSchema");
const validUrl = require("valid-url");
const shortid = require("shortid");
const limiter = require("../middleware/limiter");

const router = express.Router();

// Importing redisClient from the redisConfig
const { redisClient } = require("../config/redisConfig");

// Route to generate short-url
router.post("/url", auth, limiter, async (req, res) => {
  // Fetching original URL to be shorted
  const { originalUrl } = req.body;

  // Check if the URL is valid
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "invalid url" });
  }

  try {
    // Searching redis cache if original URL is already searched or not
    let result = await redisClient.get(originalUrl);
    let url;

    // If URL is found in the cache
    if (result) {
      url = JSON.parse(result);
      return res.status(200).json(url);
    } else {
      // Check if URL is not availabe in cache search in DB
      url = await ShortUrl.findOne({ originalUrl });

      // If URL is found in DB
      if (url) {
        redisClient.set(originalUrl, JSON.stringify(url));
        return res.status(200).json(url);
      } else {
        // Create shortid if not found in DB as well
        url = shortid.generate();
        const shortUrl = new ShortUrl({
          url,
          originalUrl,
        });

        // Save the shortid in DB
        await shortUrl.save();

        // Look for authenticated User
        const user = await User.findById(req.user._id);
        // Push short-url id in User DB
        user.urls.push(shortUrl._id);
        // Save the User
        await user.save();

        // Set the shortid and Origianl-URL as key-value pair in Redis cache
        redisClient.set(originalUrl, JSON.stringify(shortUrl));
        return res.status(201).json(shortUrl);
      }
    }
  } catch (error) {
    // Throw error
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
});

// Route to redirect to Original URL using short-url
router.get("/:url", auth, async (req, res) => {
  // Fetch shortid from params
  const url = req.params.url;

  try {
    // Find shortid in Redis cache
    let result = await redisClient.get(url);

    if (result) {
      // Redirect if found in Redis cache
      const shortUrl = JSON.parse(result);
      res.redirect(shortUrl.originalUrl);
      return res.status(200);
    } else {
      // Find in DB
      let shortUrl = await ShortUrl.findOne({ url });
      if (shortUrl) {
        // Redirect if found in DB
        res.redirect(shortUrl.originalUrl);
        return res.status(200);
      } else {
        // NOT FOUND
        return res.status(404).send("not found");
      }
    }
  } catch (error) {
    // Throw error
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
