// @ts-check

"use strict";

// Imports
const fs = require("fs");
const path = require("path");

/**
 * Static handler classes that handles handlers
 * @class
 * @static
 */
class Handler extends null {    
    /**
     * Fetches handlers from a directory
     * @param {string} root Root directory path
     * @param {object} [options] Options
     * @param {string|string[]} [options.extensions] File extensions
     * @param {string[]} [options.ignore] Path to ignore
     * @param {import("./Log.js")} [options.log] Log file
     * @param {boolean} [options.preserveLoadState] Preserves the load state of the file
     * @param {boolean} [options.recursive] Search recursively through the directory
     * @param {boolean} [options.silent] Disables logging to the console
     * @returns {((data?: object) => boolean)[]} Fetched handlers
     */
    static fetch(root, options) {
        let parsedOptions = Object.assign({
            extensions: ".handler.js",
            ignore: [],
            log: null,
            preserveLoadState: true,
            recursive: true,
            silent: false
        }, Object(options ?? {}));
        if(parsedOptions.log) parsedOptions.log.entry(`Beginning to fetch handlers from root directory '${path.resolve(root)}'`, {
            silent: parsedOptions.silent,
            styles: 96,
            title: "HANDLER_FETCH"
        });
        let directories = [ root ], handlers = [];
        while(directories.length) {
            let directory = path.resolve(directories.shift());
            if(parsedOptions.log) parsedOptions.log.entry(`Fetching commands from directory '${directory}'`, {
                silent: parsedOptions.silent,
                styles: 95,
                title: "HANDLER_FETCH"
            });
            let files = fs.readdirSync(directory);
            for(let i = 0; i < files.length; i++) {
                let nested = path.resolve(directory, files[i]), extensions = parsedOptions.extensions;
                if(parsedOptions.ignore.includes(nested)) continue;
                else if(fs.lstatSync(nested).isDirectory() && parsedOptions.recursive) directories.push(nested);
                else if(Array.isArray(extensions) ? extensions.some(v => nested.endsWith(v)) : nested.endsWith(extensions)) {
                    if(parsedOptions.log) parsedOptions.log.entry(`Fetching handler from file '${nested}'`, {
                        silent: parsedOptions.silent,
                        styles: 97,
                        title: "HANDLER_FETCH"
                    });
                    let preloaded = nested in require.cache;
                    if(preloaded) delete require.cache[nested];
                    let handler = require(nested);
                    handlers.push(handler);
                    if(!preloaded && parsedOptions.preserveLoadState) delete require.cache[nested];
                };
            };
        };
        if(parsedOptions.log) parsedOptions.log.entry(`Successfully fetched ${handlers.length} handler(s) from root directory '${path.resolve(root)}'`, {
            silent: parsedOptions.silent,
            styles: 92,
            title: "HANDLER_FETCH"
        });
        return handlers;
    };

    /**
     * Fetches a single handler from a file
     * @param {string} file File path
     * @param {object} [options] Options
     * @param {import("./Log.js")} [options.log] Log file
     * @param {boolean} [options.preserveLoadState] Preserves the load state of the file
     * @param {boolean} [options.silent] Disables logging to the console
     * @returns {(data?: object) => boolean} Fetched handler
     */
    static fetchFile(file, options) {
        let parsedOptions = Object.assign({
            log: null,
            parameters: [],
            preserveLoadState: true,
            silent: false
        }, Object(options ?? {}));
        let resolved = path.resolve(file), preloaded = resolved in require.cache;
        if(parsedOptions.log) parsedOptions.log.entry(`Fetching handler from file '${resolved}`, {
            silent: parsedOptions.silent,
            styles: 97,
            title: "HANDLER_FETCH"
        });
        if(preloaded) delete require.cache[resolved];
        let handler = require(nested);
        if(!preloaded && parsedOptions.preserveLoadState) delete require.cache[resolved];
        if(parsedOptions.log) parsedOptions.log.entry(`Successfully fetched handler from file '${resolved}`, {
            silent: parsedOptions.silent,
            styles: 92,
            title: "HANDLER_FETCH"
        });
        return handler;
    };
};

// Exports
module.exports = Handler;