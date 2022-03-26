// @ts-check

"use strict";

// Imports
const Discord = require("discord.js");
const SimpleCommand = require("../../classes/SimpleCommand.js");

/**
 * Clap command
 * @class
 * @extends {SimpleCommand}
 */
class Clap extends SimpleCommand {
    /**
     * Creates the command
     * @constructor
     */
    constructor() {
        super("clap", {
            category: "general",
            description: "This is a test command",
            permission: 0
        });
    };

    /**
     * Executes the command
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {string[]} args Arguments
     * @param {object} [data] Data
     * @return {void} Void
     */
    run(client, message, args, data) {
        message.channel.send(`👏 ${args.join(" 👏 ")} 👏`);
    };
};

// Exports
module.exports = Clap;