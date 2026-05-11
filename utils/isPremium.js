const GuildConfig = require("../models/GuildConfig");

module.exports = async (member) => {
  const config = await GuildConfig.findOne({ guildId: member.guild.id });
  if (!config?.premiumRoleId) return false;

  return member.roles.cache.has(config.premiumRoleId);
};