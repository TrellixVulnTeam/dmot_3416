// @ts-check

"use strict";

// Imports
const fs = require("fs");
const path = require("path");

/**
 * Logging system
 * @class
 */
class Log {
    /**
     * Creates a new log file
     * @constructor
     * @param {string} [file] File path
     * @param {object} [options] Options
     * @param {boolean} [options.autoConfiguration] Automatically configures the log file
     */
    constructor(file = "logs/latest.log", options) {
        /**
         * @property {string} file Log file
         */
        this.file = file;

        /**
         * @property {Intl.DateTimeFormat} formatter Date time formatter
         */
        this.formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "short", timeStyle: "medium" });

        /**
         * @property {fs.WriteStream?} stream Log stream
         */
        this.stream = null;

        let parsedOptions = Object.assign({
            autoConfiguration: true
        }, Object(options ?? {}));
        if(parsedOptions.autoConfiguration) {
            this.create();
            this.open();
        };
    };

    /**
     * Closes the log stream
     * @returns {fs.WriteStream} Log stream
     */
    close() {
        if(this.stream) throw new Error("Log stream is already closed");
        let stream = this.stream;
        this.stream = null;
        return stream;
    };

    /**
     * Creates the log file if it does not already exist
     * @param {object} [options] Options
     * @param {boolean} [options.recursive] Create file recursively through a directory
     * @returns {boolean} Indicates whether or not the file has been successfully created
     */
    create(options) {
        let parsedOptions = Object.assign({
            recursive: true
        }, Object(options ?? {}));
        if(!fs.existsSync(this.file)) {
            if(parsedOptions.recursive) fs.mkdirSync(path.dirname(this.file));
            fs.appendFileSync(this.file, "");
            return true;
        };
        return false;
    };

    /**
     * Deletes the log file
     * @returns {boolean} Indicates whether or not the file has been successfully deleted
     */
    delete() {
        if(fs.existsSync(this.file)) {
            fs.unlinkSync(this.file);
            return true;
        };
        return false;
    };

    /**
     * Logs an entry to the log file
     * @param {string} message Message
     * @param {object} [options] Options
     * @param {Date|number} [options.date] Entry date
     * @param {number} [options.datePadding] Entry date padding
     * @param {number|string|(number|string)[]} [options.dateStyles] Entry date styling
     * @param {Intl.DateTimeFormat} [options.formatter] Entry date formatter
     * @param {boolean} [options.silent] Disables printing message to console
     * @param {number|string|(number|string)[]} [options.styles] Entry styling
     * @param {string} [options.title] Entry title
     * @param {number} [options.titlePadding] Entry title padding
     * @param {number|string|(number|string)[]} [options.titleStyles] Entry title styling
     */
    entry(message, options) {
        if(!this.stream) throw new Error("Log stream is not opened yet");
        let parsedOptions = Object.assign({
            date: Date.now(),
            datePadding: 20,
            dateStyles: 94,
            formatter: null,
            silent: false,
            styles: [],
            title: "ENTRY",
            titlePadding: 25,
            titleStyles: 93
        }, Object(options ?? {}));
        let date = (parsedOptions.formatter ?? this.formatter).format(parsedOptions.date ?? Date.now()).padEnd(parsedOptions.datePadding, " ");
        let title = String(parsedOptions.title).padEnd(parsedOptions.titlePadding, " ");
        this.stream.write(`${date} | ${title} | ${message}\n`);
        if(!parsedOptions.silent) {
            let [ dateStyles, titleStyles, styles ] = [ parsedOptions.dateStyles, parsedOptions.titleStyles, parsedOptions.styles ]
                .map(v => Array.isArray(v) ? v.map(u => `\x1b[${u}m`).join("") : `\x1b[${v}m`);
            process.stdout.write(`${dateStyles}${date} \x1b[90m| ${titleStyles}${title} \x1b[90m| ${styles}${message}\x1b[0m\n`);
        };
    };

    /**
     * Returns whether or not the log file exists
     * @readonly
     * @returns {boolean} Whether or not the log file exists
     */
    get exists() {
        return fs.existsSync(this.file);
    };

    /**
     * Opens the log stream
     * @param {object} [options] Options
     * @param {boolean} [options.autoCreate] Autocreates the log file if it does not already exist 
     * @param {boolean} [options.overwrite] Overwrites the log stream if it is already opened
     * @returns {fs.WriteStream} Log stream
     */
    open(options) {
        let parsedOptions = Object.assign({
            autoCreate: true,
            overwrite: false
        }, Object(options ?? {}));
        if(!fs.existsSync(this.file)) {
            if(parsedOptions.autoCreate) this.create();
            else throw new Error("Log file does not exit");
        };
        if(!parsedOptions.overwrite && this.stream) throw new Error("Log stream is already opened. Use 'log.close()' or 'log.reopen()' instead");
        this.stream = fs.createWriteStream(this.file);
        return this.stream;
    };

    /**
     * Returns whether or not the log stream is opened
     * @readonly
     * @returns {boolean} Whether or not the log stream is opened
     */
    get opened() {
        return !!this.stream;
    };

    /**
     * Reopens the log stream
     * @param {object} [options] Options
     * @param {boolean} [options.autoCreate] Autocreates the log file if it does not already exist 
     * @param {boolean} [options.overwrite] Overwrites the log stream if it is already opened
     * @returns {fs.WriteStream} Log stream
     */
    reopen(options) {
        this.close();
        return this.open(options);
    };

    /**
     * Returns the resolved path
     * @readonly
     * @returns {string} Resolved path
     */
    get resolvedPath() {
        return path.resolve(this.file);
    };
};

// Exports
module.exports = Log;