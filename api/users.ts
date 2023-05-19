import express, {Request, Response, NextFunction} from 'express'
const usersRouter = express.Router()

const {
  getUser,
  getAllUsers
} = require('../db/models/users')

// getuser
usersRouter.get('/user', async (req: Request, res: Response, next: NextFunction) => {
  const user = await getUser
  res.send({
    user
  })
})

// getalluser
usersRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await getAllUsers
  res.send({
    users
  })
})
// getuserbyusername

// getuserbyid

// createuser

// updateuser

// deactivateuser