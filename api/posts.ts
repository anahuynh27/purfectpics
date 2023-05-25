import express, {Request, Response, NextFunction} from 'express';
const postsRouter = express.Router();

// interface
interface Post {
  postID: number,
  title: string,
  photo: string,
  content: string,
  userID: number,
  isActive: boolean,
}

module.exports = postsRouter