import { promises } from "dns";

const { client } = require('./client');
const { createUser } = require('./models/users')

async function dropTables() {
    try {
        console.log("Dropping All Tables...");
        await client.query(`
        DROP TABLE IF EXISTS post_tags;
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users; 
        `);

        console.log("Finish dropping tables...")
    } catch (error) {
        console.error("error dropping tables ....");
    }
};

async function createTables() {
    try {
        console.log("starting to build tables...");
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
        console.log("Finished creating tables...")
    } catch (error) {
        console.error("error creating tables...");
    }
}

const createInitialUsers = async () => {
    try {
        console.log("Creating users...")
        const usersToCreate = [
            {
                username: 'jinx',
                password: 'bestbb',
                avatar: 'no image'
            },
            {
                username: 'voodoo',
                password: 'bestboy',
                avatar: 'no image'
            },
            {
                username: 'lulu',
                password: 'bestgirl',
                avatar: 'no image'
            },
            {
                username: 'lemon',
                password: 'bestgg',
                avatar: 'no image'
            },
        ]
        await Promise.all(usersToCreate.map(createUser))
        console.log("Finished creating users...")
    } catch (error) {
        console.error("Error creating users...")
    }
}

async function rebuildDB() {
    try {
        console.log("before client connect");
        client.connect();
        console.log("after client connect");
        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        console.error("error during rebuildDB");
    }
}
rebuildDB();

module.exports = {
    rebuildDB,
    dropTables,

}