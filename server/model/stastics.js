const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
  card:{ type: Array },
  total: { type: Array },
  // no_of_turns: { type: Number},
  // correctValue: { type: Number },
  // responseTime: {type: Number},
  // percentage: { type: Number},
  // totalTurns: { type: Number},
  // totalCorrectValue: { type: Number },
  // totalResponseTime: { type: Number },
  // totalPercentage: { type: Number },
},{timestamps:true});

const stats = mongoose.model("statistic", userSchema);

module.exports = stats;
