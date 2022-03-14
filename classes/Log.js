// @ts-check

"use strict";

// Imports
const Events = require("events");
const fs = require("fs");
const path = require("path");

/**
 * Logging system
 * @class
 * @extends {Events}
 */
class Log extends Events {
    static #formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "short", timeStyle: "medium" });
    #path = null;
    #stream = null;

    /**
     * Creates a new log file
     * @constructor
     * @param {string} file File path
     */
    constructor(file) {
        super();
        this.#path = path.join(process.cwd(), file);
    };

    /**
     * Clears the log file
     */
    clear() {
        if(!this.exist) this.create();
        else if(!this.stream) fs.writeFileSync(this.#path, "");
        else {
            this.close();
            this.open();
        };
        super.emit("clear");
    };

    /**
     * Closes the file
     * @returns {fs.WriteStream | null} File write stream
     */
    close() {
        if(!this.#stream) return null;
        this.#stream.destroy();
        super.emit("close");
        this.#stream = null;
    };

    /**
     * Creates a log file if it doesn't exist
     */
    create() {
        if(!this.exist) {
            let directory = path.dirname(this.#path);
            if(!fs.existsSync(directory)) fs.mkdirSync(directory);
            fs.writeFileSync(this.#path, "");
            super.emit("create");
        };
    };

    /**
     * Reports an error to the log file
     * @param {string} message Message 
     * @param {boolean} print Whether or not the print the message into the console
     */
    error(message, print = true) {
        if(!this.#stream) throw new Error("The log file hasn't been opened yet");
        let { raw, colored } = Log.format(message, "error", "91");
        this.write(raw);
        if(print) process.stdout.write(colored);
        super.emit("logError", message, raw, colored);
        super.emit("log", message, raw, colored, "ERROR");
    };

    /**
     * Returns whether or not the log file exists in the file system
     * @readonly
     * @returns {boolean} Whether or not the log file exists in the file system
     */
    get exist() {
        return fs.existsSync(this.#path);
    };

    /**
     * Reports an failures to the log file
     * @param {string} message Message 
     * @param {boolean} print Whether or not the print the message into the console
     */
    fail(message, print = true) {
        if(!this.#stream) throw new Error("The log file hasn't been opened yet");
        let { raw, colored } = Log.format(message, "failure", "95");
        this.write(raw);
        if(print) process.stdout.write(colored);
        super.emit("logFailure", message, raw, colored);
        super.emit("log", message, raw, colored, "FAILURE");
    };

    /**
     * Formats the message
     * @static
     * @param {string} message Message
     * @param {string} type Type
     * @param {number | string} color ANSI color code
     * @returns {{
     *     color: number | string,
     *     colored: string,
     *     message: string,
     *     paddedNow: string,
     *     paddedType: string,
     *     raw: string,
     *     type: string
     * }}
     */
    static format(message, type, color) {
        let paddedNow = Log.now().padEnd(20, " ");
        let paddedType = String(type).toUpperCase().padEnd(15, " ");
        return {
            color, colored: `\x1b[34m${paddedNow}\x1b[90m |\x1b[93m ${paddedType}\x1b[90m |\x1b[${color}m ${message}\x1b[0m\n`,
            message, paddedNow, paddedType, raw: `${paddedNow} | ${paddedType} | ${message}\n`, type
        };
    };

    /**
     * Returns the formatter of the logging system
     * @readonly
     * @static
     * @returns {Intl.DateTimeFormat} Date time formatter
     */
    static get formatter() {
        return this.#formatter;
    };

    /**
     * Sets the formatter of the logging system
     * @static
     * @param {Intl.DateTimeFormat} formatter Date time formatter
     */
    static set formatter(formatter) {
        if(!(formatter instanceof Intl.DateTimeFormat)) throw new TypeError("Formatter must be an instance of 'Intl.DateTimeFormat'");
        this.#formatter = formatter;
    };

    /**
     * Logs an information to the log file
     * @param {string} message Message 
     * @param {boolean} print Whether or not the print the message into the console
     */
    info(message, print = true) {
        if(!this.#stream) throw new Error("The log file hasn't been opened yet");
        let { raw, colored } = Log.format(message, "info", "97");
        this.write(raw);
        if(print) process.stdout.write(colored);
        super.emit("logInfo", message, raw, colored);
        super.emit("log", message, raw, colored, "INFO");
    };

    /**
     * Logs a message to the log file
     * @param {string} message Message 
     * @param {boolean} print Whether or not the print the message into the console
     */
    log(message, print = true) {
        if(!this.#stream) throw new Error("The log file hasn't been opened yet");
        let { raw, colored } = Log.format(message, "log", "96");
        this.write(raw);
        if(print) process.stdout.write(colored);
        super.emit("logLog", message, raw, colored);
        super.emit("log", message, raw, colored, "LOG");
    };

    /**
     * Returns the formatted current time
     * @static
     * @returns {string} Formatted current time
     */
    static now() {
        return Log.#formatter.format(Date.now());
    };

    /**
     * Opens the log file
     * @returns {fs.WriteStream}
     */
    open() {
        if(!this.exist) this.create();
        if(this.#stream) return this.#stream;
        this.#stream = fs.createWriteStream(this.#path);
        super.emit("open");
        return this.#stream;
    };
    
    /**
     * Returns the path of the log file
     * @readonly
     * @returns {string}
     */
    get path() {
        return this.#path;
    };

    /**
     * Returns the write stream of the log file
     * @readonly
     * @returns {fs.WriteStream | null}
     */
    get stream() {
        return this.#stream;
    };

    /**
     * Logs a successful message to the log file
     * @param {string} message Message 
     * @param {boolean} print Whether or not the print the message into the console
     */
    success(message, print = true) {
        if(!this.#stream) throw new Error("The log file hasn't been opened yet");
        let { raw, colored } = Log.format(message, "success", "92");
        this.write(raw);
        if(print) process.stdout.write(colored);
        super.emit("logSuccess", message, raw, colored);
        super.emit("log", message, raw, colored, "SUCCESS");
    };

    /**
     * Reports a warning to the log file
     * @param {string} message Message 
     * @param {boolean} print Whether or not the print the message into the console
     */
    warn(message, print = true) {
        if(!this.#stream) throw new Error("The log file hasn't been opened yet");
        let { raw, colored } = Log.format(message, "warning", "93");
        this.write(raw);
        if(print) process.stdout.write(colored);
        super.emit("logWarning", message, raw, colored);
        super.emit("log", message, raw, colored, "WARNING");
    };

    /**
     * Writes to the log file
     * @param {string} message Message
     */
    write(message) {
        if(!this.#stream) throw new Error("The log file hasn't been opened yet");
        this.#stream.write(message);
        super.emit("write", message);
    };
};

// Exports
module.exports = Log;