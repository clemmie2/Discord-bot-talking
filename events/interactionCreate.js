const Memory = require("../models/UserMemory");
const Profile = require("../models/userProfile");
const ExtraFacts = require("../utils/extraFacts");
const groks = require("../services/grokServices");
const extraFacts = require("../utils/extraFacts");
const { Profiler } = require("react");

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (message.author.bot) return;
        if (!message.mentions.has(client.user)) return;

        let mem = await Memory.findOne({
                  userId: message.author.id,
                  guildId: message.guild.id
            });

            if (!mem) {
                mem = await Memory.create({
                    userId: message.author.id,
                    guildId: message.guild.id,
                    memories: []
                });
            }

            const facts = extraFacts(message.content.toLowerCase());
            facts.forEach(f => {
                if (!mem.memories.includes(f)) mem.memories.push(f);
            });

            await mem.save();

            let profile = await Profile.findOne({ userId: message.author.id, guildId: message.guild.id });
            if (!profile) profile = await Profile.create({ userId: message.author.id });

            const reply = await grok(profile.personality, mem.memories, message.content);

            message.reply(reply);
        }
};