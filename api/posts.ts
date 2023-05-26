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
  getPostById,
} = require('../db/models/posts');

// import require user from utils
const requireUser = require('./utils');

// create post ~~ must be logged in to create a post ~~
postsRouter.post('/create', requireUser, async (req: any, res: Response, next: NextFunction) => {
  const { title, photo, content }: Post = req.body;
  const userID: number = parseInt(req.user.id);

  // validate title lenght
  if (title.length < 1) {
    return res.status(400).json({ message: 'Title cannot be empty' })
  };

  const post: object = await createPost({ title, content, userID, photo });

  res.send({
    message: `Post created successfully! 🐾`,
    post
  });
});

// all posts
postsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const posts: object = await getAllPosts();
  res.send(posts);
});

// all active posts
postsRouter.get('/active', async (req: Request, res: Response, next: NextFunction) => {
  const activePosts: object = await getAllActivePosts();
  res.send(activePosts);
});

// get post by id
postsRouter.get('/:postID', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.postID);
  const post: object = await getPostById({id});
  res.send(post);
});

module.exports = postsRouter