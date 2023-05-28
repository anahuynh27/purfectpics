"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRouter = express_1.default.Router();
const { getUser, getAllUsers, getUserByUsername, getUserById, createUser, updateUser, deleteUser, } = require('../db/models/users');
// import require user from utils
const requireUser = require('./utils');
// import jwt
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
// getalluser
usersRouter.get('/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getAllUsers();
    res.send(users);
}));
// getuser / login
usersRouter.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield getUser({ username, password });
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
}));
// createuser ---> register an account
usersRouter.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, avatar } = req.body;
    // check if username exists
    const existingUser = yield getUserByUsername(username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
    }
    // validate password lenght
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long...' });
    }
    const register = yield createUser({ username, password, avatar });
    // sign jwt
    const token = jwt.sign({ id: register.id, username: username }, JWT_SECRET);
    res.send({
        token,
        message: `Registration successful! Welcome, ${username} 🐾`,
        register,
    });
}));
// updateuser
usersRouter.patch('/edit/:userID', requireUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, avatar } = req.body;
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
    const editUser = yield updateUser(userID, fields);
    res.send({
        message: 'user information updated',
        editUser,
    });
}));
// deactivateuser
usersRouter.patch('/deleteuser', requireUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const editUser = yield deleteUser();
    res.send({
        message: 'user deactivated',
    });
}));
// getuserbyusername
usersRouter.get('/:username', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const user = yield getUserByUsername(username);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    // delete password
    delete user.password;
    res.send(user);
}));
// getuserbyid
usersRouter.get('/id/:userID', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = parseInt(req.params.userID);
    const user = yield getUserById(userID);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    res.send(user);
}));
module.exports = usersRouter;
