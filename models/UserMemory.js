const mongoose = require("mongoose");

module.exports = mongoose.model("UserMemory", new mongoose.Schema({
  userId: String,
  guildId: String,
  memories: [String]
}));