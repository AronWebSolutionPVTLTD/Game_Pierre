const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  correctValue: { type: String },
  wrongvalue: { type: String },
  turnover: { type: String },
  average: { type: String },
  total: { type: String },
});

const stats = mongoose.model("Stats", userSchema);

module.exports = stats;
