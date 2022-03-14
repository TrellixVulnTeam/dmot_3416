// @ts-check

// Imports
const BaseCommand = require("../../classes/BaseCommand.js");

class Command extends BaseCommand {
    constructor(client) {
        super(client, {
            name: "test",
            aliases: [],
            category: "general",
            description: "This is a test command"
        });
    };

    run(message, args, data) {
        message.reply("imagine");
    };
};

// Exports
module.exports = Command;