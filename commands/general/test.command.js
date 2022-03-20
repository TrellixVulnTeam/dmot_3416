// @ts-check

"use strict";

// Imports
const Command = require("../../classes/Command.js");

class Test extends Command {
    constructor() {
        super({
            aliases: [],
            category: "general",
            description: "This is a test command",
            name: "test",
            permission: 0
        });
    };

    run(client, message, args, data) {
        message.channel.send("This is a test command");
    };
};

// Exports
module.exports = Test;