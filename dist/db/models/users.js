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
const { client } = require('../client');
const bcrypt = require('bcrypt');
;
// create user
const createUser = ({ username, password, avatar }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SALT_COUNT = 10;
        const hashedPassword = yield bcrypt.hash(password, SALT_COUNT);
        const { rows: user } = yield client.query(`
    INSERT INTO users(username, password, avatar)
    VALUES ($1, $2, $3)
    RETURNING id, username, avatar
    `, [username, hashedPassword, avatar]);
        return user;
    }
    catch (error) {
        console.error(error);
    }
});
// get user by username
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: user } = yield client.query(`
    SELECT username FROM users 
    WHERE username = $1
    `, [username]);
        return user;
    }
    catch (error) {
        console.error(error);
    }
});
// get single user *authentication
const getUser = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield getUserByUsername(username);
        const hashedPassword = user.password;
        // const { rows: user } = await client.query(`
        // SELECT * FROM users
        // RETURNING username, password
        // `)
        // can i do this way?
        //SELECT username FROM users
        const isValid = yield bcrypt.compare(password, hashedPassword);
        if (isValid) {
            return user;
        }
    }
    catch (error) {
        console.error(error);
    }
});
// get user by id
const getUserById = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: user } = yield client.query(`
    SELECT id FROM users
    WHERE id = $1
    `, [id]);
        return user;
    }
    catch (error) {
        console.error(error);
    }
});
// get all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: user } = yield client.query(`
    SELECT username FROM users
    `);
        return user;
    }
    catch (error) {
        console.error(error);
    }
});
// edit user
const updateUser = ({ id }, ...fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const setString = Object.keys(fields)
            .map((key, index) => `"${key}"=$${index + 1}`)
            .join(", ");
        const { rows: user } = yield client.query(`
    UPDATE users
    SET ${setString}
    WHERE id = ${id}
    RETURNING *
    `, Object.values(fields));
        return user;
    }
    catch (error) {
        console.error(error);
    }
    ;
});
// delete/deactivate user
const deleteUser = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: user } = yield client.query(`
    UPDATE users
    SET "isActive" = 'false'
    WHERE id =${id}
    `, [id]);
        return user;
    }
    catch (error) {
        console.error(error);
    }
});
module.exports = {
    createUser,
    getUser,
    getUserByUsername,
    getUserById
};
