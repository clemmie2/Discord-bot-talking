require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

client.commands= new Collection();

//Load commands
const folders = fs.readdirSync("./src/commands");

for (const folder of folders) {
    const files = fs.readdirSync(`./src/commands/${folder}`);
    for (const file of files) {
        const cmd = require(`./commands/${folder}/${file}`);
        client.commands.set(cmd.data.name, cmd);
}
}

//Load events
const events = fs.readdirSync("./src/events");

for (const file of events) {
      const event = require(`./events/${file}`);
        if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
          } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(console.error);

client.login(process.env.DISCORD_TOKEN);