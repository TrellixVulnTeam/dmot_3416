// @ts-check

"use strict";

// Imports
const Command = require("./classes/Command.js");
const config = require("./config.json");
const Discord = require("discord.js");
const Enmap = require("enmap");
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

// Events
client.on("ready", () => {
    console.log(new Date(client.user.createdTimestamp).toLocaleDateString())
    sessionLog.entry(`Client ${client.user.tag} is now online!`, {
        styles: 92,
        title: "ONLINE"
    });
});
client.on("messageCreate", message => {
    if(message.author.id === client.user.id) return;

    // Updates database
    database.ensure(message.author.id, {
        allowDataCollection: false,
        badges: [],
        supporter: false
    });
    if(message.channel.type !== "DM") database.ensure(message.guildId, {
        allowDataCollection: false,
        greeting: {
            leave: {
                channel: null,
                enabled: false,
                message: "Good bye, {{user}}"
            },
            roles: [],
            welcome: {
                channel: null,
                enabled: false,
                message: "Welcome to the server, {{user}}",
            }
        },
        moderation: {
            auto: {
                advertisement: false,
                capitalization: {
                    actions: [
                        {
                            type: "MESSAGE_DELETE"
                        },
                        {
                            duration: 3600000,
                            type: "MUTE"
                        }
                    ],
                    enabled: false,
                    ignore: [ /.{,10}/ ],
                    percentage: 75,
                },
                filter: {
                    actions: [
                        {
                            type: "MESSAGE_DELETE"
                        },
                        {
                            duration: 10800000,
                            type: "MUTE"
                        }
                    ],
                    enabled: false,
                    filter: [],
                    ignore: []
                },
                repeat: {
                    actions: [
                        {
                            type: "MESSAGE_DELETE"
                        },
                        {
                            duration: 3600000,
                            type: "MUTE"
                        }
                    ],
                    enabled: false,
                    ignore: [],
                    limit: 5
                },
                spam: {
                    action: [
                        {
                            type: "MESSAGE_DELETE"
                        },
                        {
                            duration: 3600000,
                            type: "MUTE"
                        }
                    ],
                    cooldown: 3000,
                    enabled: false,
                    ignore: [],
                    limit: 5
                }
            },
            channel: null,
        },
        permissions: {
            "2": [
                { type: "PERMISSION", value: "MANAGE_MESSAGES" }
            ],
            "3": [
                { type: "PERMISSION", value: "ADMINISTRATOR" }
            ],
            "4": [
                { type: "USERID", value: message.guild.ownerId }
            ]
        },
        prefixes: [ `<@!${client.user.id}> `, "dmot: " ]
    });

    // Parses commands
    let userData = database.get(message.author.id);
    if(message.channel.type === "DM") {
        let [ name, ...args ] = message.content.split(" ");
        try {
            if(!(String(name).toLowerCase() in commands)) return void message.reply("Unknown command. Use `help` for a list of commands");
            let command = commands[name];
            if(commands["permission"] !== 0) return void message.reply("This command can only be used in a guild");
            command.run(client, message, args, {
                commands, config, database, sessionLog
            });
            if(userData.allowDataCollection && Math.floor(Math.random() * 100) === 1)
                sessionLog.entry(`User ${message.author.tag} used the command '${name}' (DM)`, {
                    styles: 97,
                    title: "DATA_COLLECT"
                });
        }
        catch(error) {
            if(userData.allowDataCollection)
                sessionLog.entry(`An error occurred while the user ${message.author.tag} was executing the command '${name}' (DM)\n${error}`, {
                    styles: 91,
                    title: "ERROR"
                });
        };
    }
    else {
        let guildData = database.get(message.guildId);
        for(let i = 0; i < guildData.prefixes.length; i++) {
            let prefix = guildData.prefixes[i];
            if(message.content.toLowerCase().startsWith(prefix)) {
                let [ name, ...args ] = message.content.substring(prefix.length).split(" ");
                try {
                    if(!(String(name).toLowerCase() in commands)) return void message.reply(`Unknown command. Use \`${prefix}help\` for a list of commands`);
                    let command = commands[name];
                    command.run(client, message, args, {
                        commands, config, database, prefix, sessionLog
                    });
                    if(userData.allowDataCollection && Math.floor(Math.random() * 100) === 1)
                        sessionLog.entry(`User ${message.author.tag} used the command '${name}' (GUILD)`, {
                            styles: 97,
                            title: "DATA_COLLECT"
                        });
                    break;
                }
                catch(error) {
                    if(userData.allowDataCollection)
                        sessionLog.entry(`An error occurred while the user ${message.author.tag} was executing the command '${name}' (GUILD)\n${error}`, {
                            styles: 91,
                            title: "ERROR"
                        });
                    break;
                };
            };
        };
    };
});

// Executes
client.login(process.env.TOKEN);