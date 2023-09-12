const express = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, "SECRET", { expiresIn: "1h" });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).send({ message: "User does not exist in the database" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, "SECRET", { expiresIn: "1h" });
    res.json({ message: "User created successfully", token });
  }
});

module.exports = router;

// we are getting the data from frontend via headers / body / params
// we are using that data to do something in the backend
// returning the response on the basis of the task performed
