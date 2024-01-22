const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  phone: { type: String },
  token: { type: String },
  status: { type: Boolean, default: false },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
