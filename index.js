// @ts-check

"use strict";

// Imports
const config = require("./config.json");
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const path = require("path");

// Dotenv
require("dotenv").config();

// Logs
let session = { path: config.sessionPath, formatter: new Intl.DateTimeFormat("en-US", { dateStyle: "short", timeStyle: "medium" }) };
if(!fs.existsSync(session.path)) fs.mkdirSync(path.dirname(session.path), { recursive: true });
Object.assign(session, {
    clear() {
        this.stream.close();
        this.stream = fs.createWriteStream(session.path);
        this.success("Successfully cleared session log!");
    },
    error(message) { this.write("ERROR", message, `\x1b[91m${message}\x1b[0m`); },
    log(message) { this.write("LOG", message, `\x1b[96m${message}\x1b[0m`); },
    write(type = "ENTRY", raw = "", message) {
        let now = this.now().padEnd(20, " ");
        this.stream.write(`${now} | ${type.toUpperCase().padEnd(10, " ")} | ${raw}\n`);
        process.stdout.write(`\x1b[34m${now}\x1b[90m |\x1b[93m ${type.toUpperCase().padEnd(10, " ")}\x1b[90m | \x1b[0m ${message ?? raw}\n`);
    },
    now() { return session.formatter.format(Date.now()) },
    stream: fs.createWriteStream(session.path),
    success(message) { this.write("SUCCESS", message, `\x1b[92m${message}\x1b[0m`); },
    warn(message) { this.write("WARNING", message, `\x1b[93m${message}\x1b[0m`); }
});
if(config.sessionClearInterval > 0) setTimeout(() => session.clear(), config.sessionClearInterval);

// Variables
let client = new Discord.Client({
    intents: Object.values(Discord.Intents.FLAGS)
});
let commands = {};
let database = new Enmap("database");

// Events
client.on("ready", () => {
    console.clear();
    commands = fetchCommands();
    console.clear();
    session.success(`Client ${client.user.tag} is now online!`);
});
client.on("messageCreate", message => {
    if(message.author.bot) return;
    database.clear();
    database.ensure(message.guild.id, {
        prefixes: [ `<@!${client.user.id}> `, "dmot: " ]
    });
    let guildData = database.get(message.guild.id);
    let prefix = guildData.prefixes.find(v => message.content.toLowerCase().startsWith(v));
    if(!prefix) return;
    let [ command, ...args ] = message.content.substring(prefix.length).split(" ");
    if(!(command.toLowerCase() in commands)) return message.reply("Command not found!");
    database.ensure(message.author.id, {});
    let userData = database.get(message.author.id);
    console.log(commands)
    commands[command.toLowerCase()].run(message, args);
});

// Executes
client.login(process.env.TOKEN);

// Functions
function fetchCommands() {
    let fetched = {};
    session.log("Loading commands...");
    let fetchedCategories = fs.readdirSync(config.commandsPath);
    session.log(`${fetchedCategories.length} categories found!`);
    for(let i = 0; i < fetchedCategories.length; i++) {
        session.log(`Loading category ${fetchedCategories[i]}!`);
        let fetchedCategory = path.join(config.commandsPath, fetchedCategories[i]);
        let fetchedCommands = fs.readdirSync(fetchedCategory);
        session.log(`${fetchedCommands.length} commands found in this category!`);
        for(let j = 0; j < fetchedCommands.length; j++) {
            let fetchedCommand = new (require(path.join(process.cwd(), fetchedCategory, fetchedCommands[j])))(client, session, {
                fetchedCommands
            });
            session.log(`Loading command ${fetchedCommand.name}!`);
            fetched[fetchedCommand.name] = fetchedCommand;
            for(let k = 0; k < commands.aliases; k++) fetched[fetchedCommand.aliases[k]] = fetchedCommand;
        };
    };
    session.success("Successfully fetched all commands!");
    return fetched;
};