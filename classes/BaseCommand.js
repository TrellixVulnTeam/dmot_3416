// @ts-check

"use strict";

// Imports
const { Client } = require("discord.js");

/**
 * The base class for all commands
 * @abstract
 * @class
 */
class BaseCommand {
    static #defaultParameter = Object.freeze({
        aliases: Object.freeze([]),
        category: "template",
        description: "This is a template command",
        name: "template"
    });
    #aliases = BaseCommand.#defaultParameter.aliases;
    #category = BaseCommand.#defaultParameter.category;
    #description = BaseCommand.#defaultParameter.description;
    #name = BaseCommand.#defaultParameter.name;

    /**
     * Creates a new base command
     * @constructor
     * @param {object} data Data
     */
    constructor(data = {}) {
        Object.assign(this, Object(data));
    };

    /**
     * Returns the aliases of the command
     * @readonly
     * @returns {readonly string[]}
     */
    get aliases() {
        return this.#aliases;
    };
    
    /**
     * Sets the aliases of the command
     * @property {string[]}
     * @returns {string[]}
     */
    set aliases(aliases) {
        if(!(Symbol.iterator in aliases)) throw new TypeError("Aliases must be an array");
        this.#aliases = Array.from(aliases);
    };

    /**
     * Returns the category of the command
     * @readonly
     * @returns {string}
     */
    get category() {
        return this.#category;
    };

    /**
     * Sets the category of the command
     * @property {string}
     * @returns {string}
     */
    set category(category) {
        this.#category = String(category);
    };

    /**
     * Returns the default parameter of the base command
     * @readonly
     * @static
     * @returns {{
     *     aliases: readonly string[],
     *     category: string,
     *     description: string,
     *     name: string
     * }}
     */
    static get defaultParameter() {
        return BaseCommand.#defaultParameter;
    };

    /**
     * Returns the description of the command
     * @readonly
     * @returns {string}
     */
    get description() {
        return this.#description;
    };

    /**
     * Sets the description of the command
     * @property {string}
     * @returns {string}
     */
    set description(description) {
        this.#description = String(description);
    };

    /**
     * Returns the name of the command
     * @readonly
     * @returns {string}
     */
    get name() {
        return this.#name;
    };

    /**
     * Sets the name of the command
     * @property {string}
     * @returns {string}
     */
    set name(name) {
        this.#name = String(name);
    };
};

// Exports
module.exports = BaseCommand;