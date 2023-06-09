"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const DB_URL = process.env.database_url;
let client = new pg_1.Client({
    connectionString: DB_URL,
});
module.exports = {
    client,
};
