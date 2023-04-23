const { client } = require('./client');

async function dropTables() {
    console.log("Dropping All Tables...");

    try {
        await client.query(`
        DROP TABLE IF EXISTS users; 
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS post_tags;
        `);
    } catch (error) {
        console.error("error dropping tables ....");
    }
};

async function createTables() {
    console.log("starting to build tables...");

    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(225) UNIQUE NOT NULL,
            password VARCHAR(225) NOT NULL,
            avatar TEXT
        );

        CREATE TABLE posts (
            id SERIAL PRIMARY KEY, 
            title VARCHAR(225),
            content VARCHAR(225),
            activie BOOLEAN, 
            "usersId" INTEGER REFERENCES users(id),
            photo TEXT
        );

        CREATE TABLE comments (
            id SERIAL PRIMARY KEY, 
            content TEXT, 
            "postsid" INTEGER REFERENCES posts(id),
            "usersid" INTEGER REFERENCES users(id)
        );

        CREATE TABLE tags (
            id SERIAL PRIMARY KEY,
            name VARCHAR(225)
        );

        CREATE TABLE post_tags (
            id SERIAL PRIMARY KEY, 
            "postid" INTEGER REFERENCES posts(id),
            "usersid" INTEGER REFERENCES users(id)
        );
        `)
    } catch (error) {
        console.error("error creating tables...");
    }
}

async function rebuildDB() {
    try {
        console.log("before client connect");
        client.connect();
        console.log("after client connect");
        await dropTables();
        await createTables();
    } catch (error) {
        console.error("error during rebuildDB");
    }
}
rebuildDB();

module.exports = {
    rebuildDB,
    dropTables,

}