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
const createPost = ({ title, content, userID, photo }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: [post] } = yield client.query(`
        INSERT INTO posts(title, content, "userID", photo)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [title, content, userID, photo]);
        return post;
    }
    catch (error) {
        console.error(error);
    }
    ;
});
//get all active posts
const getAllActivePosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: posts } = yield client.query(`
        SELECT * FROM posts
        WHERE "isactive" = 'true';
        `);
        return posts;
    }
    catch (error) {
        console.error(error);
    }
    ;
});
// get all posts
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: posts } = yield client.query(`
        SELECT * FROM posts
        `);
        return posts;
    }
    catch (error) {
        console.error(error);
    }
    ;
});
//updatePost
const updatePost = ({ id }, ...fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const setString = Object.keys(fields)
            .map((key, index) => `"${key}=$${index + 1}`)
            .join(", ");
        const { rows: [posts] } = yield client.query(`
        UPDATE posts
        SET ${setString}
        WHERE id=${id}
        RETURNING *
        `, Object.values(fields));
        return posts;
    }
    catch (error) {
        console.error(error);
    }
    ;
});
//getPostById
const getPostById = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: [post] } = yield client.query(`
        SELECT * FROM posts
        WHERE id = $1
        `, [id]);
        return post;
    }
    catch (error) {
        console.error(error);
    }
    ;
});
//get posts by user
const getPostByUserID = ({ userID }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: [post] } = yield client.query(`
        SELECT * FROM posts
        WHERE "userID" = $1
        `, [userID]);
        return post;
    }
    catch (error) {
        console.error(error);
    }
    ;
});
//get post by tag name
module.exports = {
    createPost,
    updatePost,
    getAllActivePosts,
    getAllPosts,
    getPostById,
    getPostByUserID,
};
