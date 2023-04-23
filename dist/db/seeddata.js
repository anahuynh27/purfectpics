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
function dropTables() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Dropping All Tables...");
        try {
            yield client.query(`
        DROP TABLE IF EXISTS users; 
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS post_tags;
        `);
        }
        catch (error) {
            console.error("error dropping tables ....");
        }
    });
}
;
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("starting to build tables...");
        try {
            yield client.query(`
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
        `);
        }
        catch (error) {
            console.error("error creating tables...");
        }
    });
}
function rebuildDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("before client connect");
            client.connect();
            console.log("after client connect");
            yield dropTables();
            yield createTables();
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
