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
const apiRouter = express_1.default.Router();
const { getUserById } = require('../db/models/users');
// import jwt
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
// check authorization
apiRouter.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if (!auth) {
        next();
    }
    else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            if (id) {
                req.user = yield getUserById(id);
                next();
            }
        }
        catch (error) {
            console.error(error, 'error with jwt assignment');
        }
    }
}));
apiRouter.get('/', (req, res, next) => {
    res.send({
        message: "Server is online"
    });
});
//routers
const postsRouter = require('./posts');
apiRouter.use('/posts', postsRouter);
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);
module.exports = apiRouter;
