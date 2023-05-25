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
};

const {
  createPost,
} = require('../db/models/posts');

// import require user from utils
const requireUser = require('./utils');

// create post ~~ must be logged in to create a post ~~
postsRouter.post('/create', requireUser, async (req: Request, res: Response, next: NextFunction) => {
  const { title, photo, content }: Post = req.body;

  // validate title lenght
  if (title.length < 1) {
    return res.status(400).json({ message: 'Title cannot be empty' })
  };

  const post: object = await createPost({title, photo, content});

  res.send({
    message: `Post created successfully! 🐾`,
    post
  });
});

module.exports = postsRouter