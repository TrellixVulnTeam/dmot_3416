// @ts-check

"use strict";

// Imports
const fs = require("fs");
const path = require("path");

/**
 * Base command class for all commands
 * @class
 */
class Command {
    /**
     * Creates a new command
     * @constructor
     * @param {object} [data] Data
     */
    constructor(data) {
        Object.assign(this, Object(data ?? {}));
        
        /**
         * @property {object} data Data
         */
        this.data = data;
    };

    /**
     * Fetches commands from a directory
     * @param {string} root Root directory path
     * @param {object} [options] Options
     * @param {string|string[]} [options.extensions] File extensions
     * @param {string[]} [options.ignore] Path to ignore
     * @param {import("./Log.js")} [options.log] Log file
     * @param {any[]} [options.parameters] Parameters to initialize the command
     * @param {boolean} [options.preserveLoadState] Preserves the load state of the file
     * @param {boolean} [options.recursive] Search recursively through the directory
     * @param {boolean} [options.silent] Disables logging to the console
     * @returns {{ [name: string]: Command }|{}} Fetched commands
     */
    static fetch(root, options) {
        let parsedOptions = Object.assign({
            extensions: ".command.js",
            ignore: [],
            log: null,
            parameters: [],
            preserveLoadState: true,
            recursive: true,
            silent: false
        }, Object(options ?? {}));
        if(parsedOptions.log) parsedOptions.log.entry(`Beginning to fetch commands from root directory '${path.resolve(root)}'`, {
            silent: parsedOptions.silent,
            styles: 96,
            title: "COMMAND_FETCH"
        });
        let directories = [ root ], commands = {}, counter = 0;
        while(directories.length) {
            let directory = path.resolve(directories.shift());
            if(parsedOptions.log) parsedOptions.log.entry(`Fetching commands from directory '${directory}'`, {
                silent: parsedOptions.silent,
                styles: 95,
                title: "COMMAND_FETCH"
            });
            let files = fs.readdirSync(directory);
            for(let i = 0; i < files.length; i++) {
                let nested = path.resolve(directory, files[i]), extensions = parsedOptions.extensions;
                if(parsedOptions.ignore.includes(nested)) continue;
                else if(fs.lstatSync(nested).isDirectory() && parsedOptions.recursive) directories.push(nested);
                else if(Array.isArray(extensions) ? extensions.some(v => nested.endsWith(v)) : nested.endsWith(extensions)) {
                    if(parsedOptions.log) parsedOptions.log.entry(`Fetching command from file '${nested}'`, {
                        silent: parsedOptions.silent,
                        styles: 97,
                        title: "COMMAND_FETCH"
                    });
                    let preloaded = nested in require.cache;
                    if(preloaded) delete require.cache[nested];
                    let command = new (require(nested))(...parsedOptions.parameters);
                    counter++;
                    commands[command.name] = command;
                    for(let j = 0; j < command.aliases.length; j++) commands[command.aliases[j]] = command;
                    if(!preloaded && parsedOptions.preserveLoadState) delete require.cache[nested];
                };
            };
        };
        if(parsedOptions.log) parsedOptions.log.entry(`Successfully fetched ${counter} command(s) from root directory '${path.resolve(root)}'`, {
            silent: parsedOptions.silent,
            styles: 92,
            title: "COMMAND_FETCH"
        });
        return commands;
    };

    /**
     * Fetches a single command from a file
     * @param {string} file File path
     * @param {object} [options] Options
     * @param {import("./Log.js")} [options.log] Log file
     * @param {any[]} [options.parameters] Parameters to initialize the command
     * @param {boolean} [options.preserveLoadState] Preserves the load state of the file
     * @param {boolean} [options.silent] Disables logging to the console
     * @returns {Command} Fetched commands
     */
    static fetchFile(file, options) {
        let parsedOptions = Object.assign({
            log: null,
            parameters: [],
            preserveLoadState: true,
            silent: false
        }, Object(options ?? {}));
        let resolved = path.resolve(file), preloaded = resolved in require.cache;
        if(parsedOptions.log) parsedOptions.log.entry(`Fetching command from file '${resolved}`, {
            silent: parsedOptions.silent,
            styles: 97,
            title: "COMMAND_FETCH"
        });
        if(preloaded) delete require.cache[resolved];
        let command = new (require(nested))(...parsedOptions.parameters);
        if(!preloaded && parsedOptions.preserveLoadState) delete require.cache[resolved];
        if(parsedOptions.log) parsedOptions.log.entry(`Successfully fetched command from file '${resolved}`, {
            silent: parsedOptions.silent,
            styles: 92,
            title: "COMMAND_FETCH"
        });
        return command;
    };
};

// Exports
module.exports = Command;