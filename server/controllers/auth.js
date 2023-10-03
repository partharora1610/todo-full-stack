const jwt = require("jsonwebtoken");
const User = require("./../db/User.js");

const signToken = (id) => {
  return jwt.sign({ id }, "SECRETKEY", { expiresIn: "1h" });
};

exports.loginHandler = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email && !password) {
    // throw an app error
  }

  const user = await User.findOne({ email }).select("+passsword");

  if (!user || !(password === user.password)) {
    return; // later with the correct passowrd method
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "User logged In",
    token,
    data: {
      user,
    },
  });
};

exports.signupHandler = async (req, res) => {
  const newUser = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    confrimPassword: req.body.confrimPassword,
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    message: "New user created",
    token,
    data: {
      user: newUser,
    },
  });
};

// need to implmemnt this
exports.refreshHandler = async (req, res) => {};

// need to implment this
exports.socialAuthHandler = async (req, res) => {};
