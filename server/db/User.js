const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  email: {
    type: String,
    required: [true, "User must have a email"],
    unique: true,
    lowercase: true,
    minlength: 8,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  passwordChangedAt: Date,
  // other things to implement here:
  // validator
  // image link
  // confirm password
});

const User = mongoose.model("User", userSchema);

module.exports = User;
