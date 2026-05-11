const mongoose = require("mongoose");

module.exports = mongoose.model("UserProfile", new mongoose.Schema({
  userId: String,
  personality: {
  type: String,
  default: "Friendly AI assistant"
    }
}));