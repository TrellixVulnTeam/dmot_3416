// @ts-check

"use strict";

// Imports
const Command = require("./Command.js");
const Discord = require("discord.js");

/**
 * Base class for a simple command
 * @class
 * @extends {Command}
 */
class SimpleCommand extends Command {
    /**
     * Creates a new simple command
     * @constructor
     * @param {string} name Name
     * @param {object} [data] Data
     */
    constructor(name, data) {
        super(Object.assign({
            aliases: [],
            category: "debug",
            description: "",
            permission: 0
        }, Object(data ?? {}), { name }));
        
        /**
         * @type {string[]} Aliases
         */
        this.aliases;

        /**
         * @type {string} Category
         */
        this.aliases;

        /**
         * @type {string} Description
         */
        this.description;

        /**
         * @type {string} Name
         */
        this.name;

        /**
         * @type {number} Permission
         *
         */
        this.permission;
    };

    /**
     * Executes the command
     * @virtual
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {string[]} args Arguments
     * @param {object} [data] Data
     * @returns {void} Void
     */
    run(client, message, args, data) {};
};

// Exports
module.exports = SimpleCommand;