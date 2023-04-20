const express = require("express");
const User = require("../models/userSchema");
const auth = require("../middleware/auth");

const router = express.Router();

// Route to create User
router.post("/users", async (req, res) => {
  // Fetch user details
  const user = new User(req.body);
  try {
    await user.save();

    // Generate Authentication token
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Route to Login
router.post("/users/login", async (req, res) => {
  try {
    // Search user in DB
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    // Generate Authentication token
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Route to logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
