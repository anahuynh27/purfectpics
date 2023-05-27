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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsRouter = express_1.default.Router();
;
const { createPost, updatePost, getAllPosts, getAllActivePosts, getPostById, getPostByUserID } = require('../db/models/posts');
// import require user from utils
const requireUser = require('./utils');
// create post ~~ must be logged in to create a post ~~
postsRouter.post('/create', requireUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, photo, content } = req.body;
    const userID = parseInt(req.user.id);
    // validate title lenght
    if (title.length < 1) {
        return res.status(400).json({ message: 'Title cannot be empty' });
    }
    ;
    const post = yield createPost({ title, content, userID, photo });
    res.send({
        message: `Post created successfully! 🐾`,
        post
    });
}));
// edit post ~~ must b logged in to edit post ~~
postsRouter.patch('/edit/:postID', requireUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, photo, content } = req.body;
    const userID = parseInt(req.user.id);
    const postID = parseInt(req.params.postID);
    // function or boolean to check if current user can edit post
    console.log({ title, photo, content, userID, postID }, 'api');
    const editPost = yield updatePost(postID, { title, photo, content });
    res.send({
        message: `Post updated successfully! 🐾`,
        editPost
    });
}));
// all posts
postsRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield getAllPosts();
    res.send(posts);
}));
// all active posts
postsRouter.get('/active', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const activePosts = yield getAllActivePosts();
    res.send(activePosts);
}));
// get post by id
postsRouter.get('/:postID', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.postID);
    const post = yield getPostById({ id });
    res.send(post);
}));
postsRouter.get('/user/:userID', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = parseInt(req.params.userID);
    const post = yield getPostByUserID({ userID });
    res.send(post);
}));
module.exports = postsRouter;
