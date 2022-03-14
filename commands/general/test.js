// @ts-check

"use strict";

// Imports
const { Client, Message } = require("discord.js");
const SimpleCommand = require("../../classes/SimpleCommand.js");

/**
 * Command class
 * @class
 * @extends {SimpleCommand}
 */
class Command extends SimpleCommand {
    /**
     * Creates a new command
     * @constructor
     * @param {Client} client Client
     * @param {object} session Session object
     * @param {object} data Data
     */
    constructor(client, session, data) {
        super(client, "test", session, {
            aliases: [],
            category: "general",
            description: "This is a test command for the client"
        });
        this.data = data;
    };

    /**
     * Executes the command
     * @param {Message} message Message
     * @param {string[]} args Arguments
     * @param {object} data Data
     * @returns {void}
     */
    run(message, args, data) {
        message.reply("test");
    };
};

// Exports
module.exports = Command;