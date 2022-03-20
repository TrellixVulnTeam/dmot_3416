// test

"use strict";

// @ts-check

"use strict";

// Imports
const CommandHandler = require("./classes/CommandHandler.js");
const config = require("./config.json");
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const Log = require("./classes/Log.js");
const path = require("path");

// Configuration
require("dotenv").config();

// Logs
let session = new Log(config.sessionPath);
session.open();
if(config.sessionClearInterval > 0) setTimeout(() => session.clear(), config.sessionClearInterval);

// Variables
let client = new Discord.Client({
    intents: Object.values(Discord.Intents.FLAGS)
});
let commands = {};
let database = new Enmap("database");

// Events
client.on("ready", () => {
    console.clear();
    commands = CommandHandler.fetch(client, config.commandsPath, session);
    console.clear();
    session.success(`Client ${client.user.tag} is now online!`);
});
client.on("messageCreate", message => {
    if(message.author.bot) return;
    database.clear();
    database.ensure(message.guild.id, {
        prefixes: [ `<@!${client.user.id}> `, "dmot: " ]
    });
    let guildData = database.get(message.guild.id);
    let prefix = guildData.prefixes.find(v => message.content.toLowerCase().startsWith(v));
    if(!prefix) return;
    let [ command, ...args ] = message.content.substring(prefix.length).split(" ");
    if(!(command.toLowerCase() in commands)) return message.reply("Command not found!");
    database.ensure(message.author.id, {});
    let userData = database.get(message.author.id);
    commands[command.toLowerCase()].run(message, args);
});

// Executes
client.login(process.env.TOKEN);