const { Pool } = require("pg");

const connectionString = "postgres://localhost:5432/purfectpics-dev";

let client = new Pool({
    connectionString
})

module.exports = client; 