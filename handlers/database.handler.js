// @ts-check

"use strict";

// Imports
const Discord = require("discord.js");

/**
 * Handles database interaction and migration
 * @param {object} [data] Data
 * @param {Discord.Client} [data.client] Client
 * @param {object} [data.data] Additional resources
 * @param {import("../config.json")} [data.data.config] Config
 * @param {import("enmap").default} [data.data.database] Additional resources
 * @param {Discord.Message} [data.message] Message
 * @returns {boolean} Exit code
 */
function database(data) {
    let { client, message, data: { config, database } } = data;
    database.clear();
    database.ensure(message.guildId, {
        prefixes: [ `<@!${client.user.id}> ` ].concat(config.defaultPrefixes)
    });
    return true;
};

// Exports
module.exports = database;