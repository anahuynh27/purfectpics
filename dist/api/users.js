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
const { getUser, getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../db/models/users');
// getuser / login
usersRouter.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    const user = yield getUser({ username, password });
    res.send({
        user
    });
}));
// getalluser
usersRouter.get('/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getAllUsers();
    res.send({
        users
    });
}));
// getuserbyusername
usersRouter.get('/:username', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUserById();
    res.send({
        user
    });
}));
// createuser --->register an account
usersRouter.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const register = yield createUser();
    res.send({
        message: 'user created!'
    });
}));
// updateuser
usersRouter.patch('/edituser', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const editUser = yield updateUser();
    res.send({
        message: 'user information updated'
    });
}));
// deactivateuser
usersRouter.patch('/deleteuser', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const editUser = yield deleteUser();
    res.send({
        message: 'user deactivated'
    });
}));
module.exports = usersRouter;
