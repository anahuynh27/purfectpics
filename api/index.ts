import express, { Request, Response, NextFunction } from 'express';
const apiRouter = express.Router();
const { getUserById } = require('../db/models/users');

// import jwt
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// check authorization
apiRouter.use(async (req: any, res: Response, next: NextFunction) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      console.error(error, 'error with jwt assignment');
    }
  }
});

apiRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({
    message: 'Server is online',
  });
});

//routers
const postsRouter = require('./posts');
apiRouter.use('/posts', postsRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
