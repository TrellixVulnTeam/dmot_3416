// @ts-check

"use strict";

// Imports
const BaseCommand = require("./BaseCommand.js");
const { Client } = require("discord.js");

/**
 * Simple command class for basic usage
 * @class
 * @extends {BaseCommand}
 */
class SimpleCommand extends BaseCommand {
    #client = null;
    #session = null;

    /**
     * Creates a new simple command
     * @constructor
     * @param {Client} client client 
     * @param {string} name Name
     * @param {object} session Session object 
     * @param {object} data Data
     */
    constructor(client, name, session, data = {}) {
        if(!name || typeof name !== "string" || name.length > 100) throw new Error("Invalid command name!");
        super(Object.assign(Object(data), { name }));
        this.#client = client;
        this.#session = session;
    };

    /**
     * Returns the client of the command
     * @readonly
     * @returns {Client}
     */
    get client() {
        return this.#client;
    };

    /**
     * Returns the session object of the command
     * @readonly
     * @returns {object}
     */
    get session() {
        return this.#session;
    };
};

// Exports
module.exports = SimpleCommand;