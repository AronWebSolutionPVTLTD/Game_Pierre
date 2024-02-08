const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId},
  cardName:{ type: String },
  no_of_turns: { type: Number},
  correctValue: { type: Number },
  responseTime: {type: Number},
  percentage: { type: Number}

});

const stats = mongoose.model("Stats", userSchema);

module.exports = stats;
