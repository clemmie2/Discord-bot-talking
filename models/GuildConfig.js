const mongoose = require('mongoose');

module.exports = mongoose.model("GuildConfig", new mongoose.Schema({
    guildId: String,
    PremiumRoleId: String
}));