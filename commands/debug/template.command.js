// @ts-check

"use strict";

// Imports
const Command = require("../../classes/Command.js");

class Template extends Command {
    constructor() {
        super({
            aliases: [],
            category: "debug",
            description: "This is a template command",
            name: "template",
            permission: 5
        });
    };

    run(client, message, args, data) {
        message.channel.send("This is a template command");
    };
};

// Exports
module.exports = Template;