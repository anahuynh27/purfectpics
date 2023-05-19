import express, {Request, Response, NextFunction} from "express";
const apiRouter = express.Router();

apiRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({
    message: "Server is online"
  })
})

// routers
const postsRouter = require('./posts')
apiRouter.use('/posts', postsRouter)

const usersRouter = require('./users')
apiRouter.use('/users', usersRouter)

module.exports = apiRouter;