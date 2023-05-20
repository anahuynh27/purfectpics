import express, {Request, Response, NextFunction} from 'express'
const usersRouter = express.Router()

const {
  getUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
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
usersRouter.get('/user/:username', async (req: Request, res: Response, next: NextFunction) => {
  const user = await getUserById
  res.send({
    user
  })
})

// createuser
usersRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const register = await createUser;
  res.send({
    message: 'user created!'
  })
})

// updateuser
usersRouter.patch('/edituser', async (req: Request, res: Response, next: NextFunction) => {
  const editUser = await updateUser
  res.send({
    message: 'user information updated'
  })
})

// deactivateuser
usersRouter.patch('/deleteuser', async (req: Request, res: Response, next: NextFunction) => {
  const editUser = await deleteUser
  res.send({
    message: 'user deactivated'
  })
})

module.exports = usersRouter