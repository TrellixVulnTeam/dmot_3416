// @ts-check

"use strict";

// Imports
const Command = require("../../classes/Command.js");

/**
 * Command class
 * @class
 * @extends {Command}
 */
class Template extends Command {
    /**
     * Creates a new command
     */
    constructor() {
        super({
            aliases: [],
            category: "debug",
            description: "This is a template command",
            name: "template",
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