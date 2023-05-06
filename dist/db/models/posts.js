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
const createPost = ({ title, content, usersId, isActive, photo }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: [post] } = yield client.query(`
        INSERT INTO posts(title, content, "usersId", photo)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [title, content, usersId, photo]);
        return post;
    }
    catch (error) {
        console.error(error);
    }
});
//get all active posts
const getAllActivePosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: posts } = yield client.query(`
    SELECT id
    FROM posts
    WHERE "isActive" = 'true';
    `);
        console.log(posts);
        return posts;
    }
    catch (error) {
        console.error(error);
    }
});
//updatePost
//getPostById
//get posts by user
//get post by tag name
module.exports = {
    createPost,
    getAllActivePosts,
};
