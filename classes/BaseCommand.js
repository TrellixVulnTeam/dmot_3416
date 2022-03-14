// @ts-check

"use strict";

class BaseCommand {
    #client;
    #data;
    
    constructor(client, data) {
        this.#client = client;
        this.#data = data;
        Object.assign(this, Object(data));
    };

    get client() {
        return this.#client;
    };

    get data() {
        return this.#data;
    };
};

// Exports
module.exports = BaseCommand;