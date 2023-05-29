import express, { Request, Response, NextFunction } from 'express';
const postsRouter = express.Router();

// interface
interface Post {
  postID: number;
  title: string;
  photo: string;
  content: string;
  userID: number;
  isActive: boolean;
}

const {
  createPost,
  updatePost,
  getAllPosts,
  getAllActivePosts,
  getPostById,
  getPostByUserID,
} = require('../db/models/posts');

const { getUserById } = require('../db/models/users');

// import require user from utils
const requireUser = require('./utils');

// create post ~~ must be logged in to create a post ~~
postsRouter.post('/create', requireUser, async (req: any, res: Response, next: NextFunction) => {
  const { title, photo, content }: Post = req.body;
  const userID: number = parseInt(req.user.id);

  // validate title length
  if (title.length < 1) {
    return res.status(400).json({ message: 'Title cannot be empty' });
  }

  const post: object = await createPost({ title, content, userID, photo });

  res.send({
    message: `Post created successfully! 🐾`,
    post,
  });
});

// edit post ~~ must be logged in to edit post ~~
postsRouter.patch(
  '/edit/:postID',
  requireUser,
  async (req: any, res: Response, next: NextFunction) => {
    const { title, photo, content }: Post = req.body;
    const userID: number = parseInt(req.user.id);
    const postID: number = parseInt(req.params.postID);

    // validate title length
    if (title.length < 1) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    // boolean to check if current user can edit post
    const authorizedUser = await getUserById(userID);
    const post = await getPostById(postID);
    if (authorizedUser.id != post.userID) {
      return res.status(400).json({ message: `You must be the owner of this post to edit` });
    }

    const fields = {
      title,
      content,
      userID,
      photo,
    };

    const editPost: object = await updatePost(postID, fields);

    res.send({
      message: `Post updated successfully! 🐾`,
      editPost,
    });
  }
);

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
  const post: object = await getPostById({ id });
  res.send(post);
});

// get posts by user id
postsRouter.get('/user/:userID', async (req: Request, res: Response, next: NextFunction) => {
  const userID = parseInt(req.params.userID);
  const post: object = await getPostByUserID({ userID });
  res.send(post);
});

module.exports = postsRouter;
