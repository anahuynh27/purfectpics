"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { client } = require('./client');
const { createUser } = require('./models/users');
const { createPost } = require('./models/posts');
function dropTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Dropping All Tables...");
            yield client.query(`
        DROP TABLE IF EXISTS post_tags;
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users; 
        `);
            console.log("Finish dropping tables...");
        }
        catch (error) {
            console.error("error dropping tables ....");
        }
    });
}
;
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("starting to build tables...");
            yield client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(225) UNIQUE NOT NULL,
            password VARCHAR(225) NOT NULL,
            avatar TEXT,
            isActive BOOLEAN DEFAULT true
        );

        CREATE TABLE posts (
            id SERIAL PRIMARY KEY, 
            title VARCHAR(225),
            content VARCHAR(225),
            isActive BOOLEAN DEFAULT true, 
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
        `);
            console.log("Finished creating tables...");
        }
        catch (error) {
            console.error("error creating tables...");
        }
    });
}
const createInitialUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Creating users...");
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
        ];
        const createdNewUsers = yield Promise.all(usersToCreate.map(createUser));
        console.log(createdNewUsers);
        console.log("Finished creating users...");
    }
    catch (error) {
        console.error("Error creating users...");
    }
});
const createInitalPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("creating initial posts...");
        const postsToCreate = [
            {
                title: 'my dog is the cutest everrrrr',
                content: 'JUST LOOK AT THAT FACE',
                usersId: 3,
                photo: 'not available'
            },
            {
                title: 'smelly farts',
                content: 'my dog ate too much cheese. It stanky!',
                usersId: 1,
                photo: 'not available'
            },
            {
                title: 'park time!',
                content: 'beautiful sunset with my owner',
                usersId: 2,
                photo: 'not available'
            }
        ];
        const createdNewPosts = yield Promise.all(postsToCreate.map(createPost));
        console.log(createdNewPosts);
        console.log('Finished creating posts...');
    }
    catch (error) {
        console.error("Error creating posts");
    }
});
function rebuildDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("before client connect");
            client.connect();
            console.log("after client connect");
            yield dropTables();
            yield createTables();
            yield createInitialUsers();
            yield createInitalPosts();
            client.end();
        }
        catch (error) {
            console.error("error during rebuildDB");
        }
    });
}
rebuildDB();
module.exports = {
    rebuildDB,
    dropTables,
};
