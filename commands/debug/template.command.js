// @ts-check

"use strict";

// Imports
const SimpleCommand = require("../../classes/SimpleCommand.js");

/**
 * Command class
 * @class
 * @extends {SimpleCommand}
 */
class Template extends SimpleCommand {
    /**
     * Creates a new command
     */
    constructor() {
        super("template", {
            aliases: [],
            category: "debug",
            description: "This is a template command",
            permission: 0
        });
    };

    /**
     * Executes the command
     * @param {import("discord.js").Client} client Client 
     * @param {import("discord.js").Message} message Message
     * @param {string[]} args Arguments
     * @param {object} [data] Data
     */
    run(client, message, args, data) {
        message.channel.send("This is a template command");
    };
};

// Exports
module.exports = Template;