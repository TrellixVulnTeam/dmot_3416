// @ts-check

"use strict";

// Imports
const Discord = require("discord.js");

/**
 * Handles user command input
 * @param {object} [data] Data
 * @param {Discord.Client} [data.client] Client
 * @param {object} [data.data] Additional resources
 * @param {{ [name: string]: import("../classes/SimpleCommand.js") }|{}} [data.data.commands] Commands
 * @param {import("enmap").default} [data.data.database] Additional resources
 * @param {Discord.Message} [data.message] Message
 * @returns {boolean} Exit code
 */
function command(data) {
    let { client, message, data: { commands, database }} = data;
    if(message.author.id === client.user.id) return true;
    let prefixes = database.get(message.guildId, "prefixes");
    for(let i = 0; i < prefixes.length; i++) {
        let prefix = prefixes[i];
        if(message.content.toLowerCase().startsWith(prefix) && message.content.toLowerCase() !== prefix) {
            let [ parsedCommand, ...parsedArguments ] = message.content.substring(prefix.length).split(" ");
            if(!(parsedCommand.toLowerCase() in commands)) {
                let response = message.content.substring(0, 500) + (message.content.length > 500 ? "..." : "");
                message.reply(`> Cannot find command \`${response}\`. Type \`${prefix}help\` for a list of commands!`);
                break;
            };
            /**
             * @type {import("../classes/SimpleCommand.js")} Command
             */
            let command = commands[parsedCommand.toLowerCase()];
            command.run(client, message, parsedArguments, {
                command,
                data,
                parsedCommand,
                prefix,
                prefixes
            });
            break;
        };
    };
    return true;
};

// Exports
module.exports = command;