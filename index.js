// @ts-check

"use strict";

// Imports
const Command = require("./classes/Command.js");
const config = require("./config.json");
const Discord = require("discord.js");
const Enmap = require("enmap");
const Handler = require("./classes/Handler.js");
const Log = require("./classes/Log.js");

// Initializations
require("dotenv").config();
console.clear();
let sessionLog = new Log(config.sessionPath);
let client = new Discord.Client({
    intents: Object.values(Discord.Intents.FLAGS),
    partials: [ "CHANNEL" ]
});
let commands = Command.fetch(config.commandsPath, {
    log: sessionLog
});
// @ts-ignore
let database = new Enmap({ name: "database" });
let handlers = Object.fromEntries(Handler.fetch(config.handlersPath, {
    log: sessionLog
}).map(v => [ v.name, v ]));

// Events
client.on("ready", () => {
    sessionLog.entry(`Client ${client.user.tag} is now online!`, {
        styles: 92,
        title: "ONLINE"
    });
});
client.on("messageCreate", message => {
    let data = {
        client, message, data: {
            commands,
            config,
            database,
            handlers,
            sessionLog
        }
    };
    handlers.database(data);
    if(handlers.filter(data)) return;
    handlers.command(data);
});



// Executes
client.login(process.env.TOKEN);