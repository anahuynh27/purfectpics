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
  getAllPosts,
  getAllActivePosts,
} = require('../db/models/posts');

// import require user from utils
const requireUser = require('./utils');

// create post ~~ must be logged in to create a post ~~
postsRouter.post('/create', requireUser, async (req: any, res: Response, next: NextFunction) => {
  const { title, photo, content }: Post = req.body;
  const usersID: number = req.user.id;
  console.log({usersID})

  // validate title lenght
  if (title.length < 1) {
    return res.status(400).json({ message: 'Title cannot be empty' })
  };

  const post: object = await createPost({ title, content, usersID, photo });

  res.send({
    message: `Post created successfully! 🐾`,
    post
  });
});

// all posts
postsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const posts: object = await getAllPosts();
  res.send(posts)
});

// all active posts
postsRouter.get('/active', async (req: Request, res: Response, next: NextFunction) => {
  const activePosts: object = await getAllActivePosts();
  res.send(activePosts)
})

module.exports = postsRouter