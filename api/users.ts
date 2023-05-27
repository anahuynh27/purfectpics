import express, { Request, Response, NextFunction } from 'express';
const usersRouter = express.Router();

// interface
interface User {
  username: string;
  password: string;
  avatar: string;
}

const {
  getUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../db/models/users');

// import require user from utils
const requireUser = require('./utils');

// import jwt
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// getalluser
usersRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  const users: object = await getAllUsers();
  res.send(users);
});

// getuser / login
usersRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: User = req.body;
  const user = await getUser({ username, password });

  // invalid username
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // sign jwt
  const token = jwt.sign({ id: user.id, username: username }, JWT_SECRET);

  res.send({
    token,
    message: `Welcome back, ${username}! 🐾`,
    user,
  });
});

// createuser ---> register an account
usersRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, avatar }: User = req.body;

  // check if username exists
  const existingUser: boolean = await getUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  // validate password lenght
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long...' });
  }

  const register = await createUser({ username, password, avatar });

  // sign jwt
  const token = jwt.sign({ id: register.id, username: username }, JWT_SECRET);

  res.send({
    token,
    message: `Registration successful! Welcome, ${username} 🐾`,
    register,
  });
});

// updateuser
usersRouter.patch('/edit/:userID', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, avatar }: User = req.body;
  const userID = parseInt(req.params.userID);

  // validate password lenght
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long...' });
  }

  const fields = {
    username: username,
    password: password,
    avatar: avatar,
  };

  const editUser = await updateUser(userID, fields);
  res.send({
    message: 'user information updated',
    editUser,
  });
});

// deactivateuser
usersRouter.patch('/deleteuser', async (req: Request, res: Response, next: NextFunction) => {
  const editUser = await deleteUser();
  res.send({
    message: 'user deactivated',
  });
});

// getuserbyusername
usersRouter.get('/:username', async (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username;
  const user = await getUserByUsername(username);

  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  // delete password
  delete user.password;

  res.send(user);
});

// getuserbyid
usersRouter.get('/id/:userID', async (req: Request, res: Response, next: NextFunction) => {
  const userID = parseInt(req.params.userID);
  const user = await getUserById(userID);

  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  res.send(user);
});

module.exports = usersRouter;
