// @ts-check

"use strict";

// Imports
const { Client } = require("discord.js");
const fs = require("fs");
const Log = require("./Log.js");
const path = require("path");

/**
 * Command handler
 * @class
 * @static
 */
class CommandHandler extends null {
    /**
     * Fetches all the commands
     * @static
     * @param {Client} client Client
     * @param {string} directory Directory
     * @param {Log} log Logging system
     * @returns {object} Commands
     */
    static fetch(client, directory, log) {
        let fetched = {};
        if(log) {
            log.log("Fetching commands...");
            let categoriesPath = path.join(process.cwd(), directory), categories = fs.readdirSync(categoriesPath);
            log.info(`Found ${categories.length} categories!`);
            for(let i = 0; i < categories.length; i++) {
                log.log(`Loading category ${categories[i]}...`);
                let commandsPath = path.join(categoriesPath, categories[i]), commands = fs.readdirSync(commandsPath);
                log.info(`Found ${commands.length} commands!`);
                for(let j = 0; j < commands.length; j++) {
                    let commandPath = path.join(commandsPath, commands[j]);
                    if(commandPath in require.cache) delete require.cache[commandPath];
                    let command = new (require(commandPath))(client);
                    log.log(`Loading command ${command.name}...`);
                    fetched[command.name] = command;
                    for(let k = 0; k < command.aliases.length; k++) fetched[command.aliases[k]] = command;
                };
            };
            log.success("Successfully fetched all commands");
        }
        else {
            let categoriesPath = path.join(process.cwd(), directory), categories = fs.readdirSync(categoriesPath);
            for(let i = 0; i < categories.length; i++) {
                let commandsPath = path.join(categoriesPath, categories[i]), commands = fs.readdirSync(commandsPath);
                for(let j = 0; j < commands.length; j++) {
                    let commandPath = path.join(commandsPath, commands[j]);
                    if(commandPath in require.cache) delete require.cache[commandPath];
                    let command = new (require(commandPath))(client);
                    fetched[command.name] = command;
                    for(let k = 0; k < command.aliases.length; k++) fetched[command.aliases[k]] = command;
                };
            };
        };
        return fetched;
    };
};

// Exports
module.exports = CommandHandler;