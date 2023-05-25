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
const { createPost, } = require('../db/models/posts');
// import require user from utils
const requireUser = require('./utils');
// create post ~~ must be logged in to create a post ~~
postsRouter.post('/create', requireUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, photo, content } = req.body;
    // validate title lenght
    if (title.length < 1) {
        return res.status(400).json({ message: 'Title cannot be empty' });
    }
    ;
    const post = yield createPost({ title, photo, content });
    res.send({
        message: `Post created successfully! 🐾`,
        post
    });
}));
module.exports = postsRouter;
