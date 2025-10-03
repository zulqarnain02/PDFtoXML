// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String},
  resetPasswordExpires: { type: Date },
});

module.exports = mongoose.model("user", UserSchema);
