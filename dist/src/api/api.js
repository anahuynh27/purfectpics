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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserByUserID = exports.fetchUserByUsername = exports.fetchUsers = exports.fetchRegister = exports.fetchLogin = exports.APIURL = void 0;
// local server
exports.APIURL = 'http://localhost:3000/api';
// login user
const fetchLogin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
        }),
    });
    const json = yield res.json();
    return json;
});
exports.fetchLogin = fetchLogin;
// register user
const fetchRegister = (username, password, avatar) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
            avatar: `${avatar}`,
        }),
    });
    const json = yield res.json();
    return json;
});
exports.fetchRegister = fetchRegister;
// fetch all users
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/users/all`);
    const json = yield res.json();
    return json;
});
exports.fetchUsers = fetchUsers;
// fetch user by username
const fetchUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/users/${username}`);
    const json = yield res.json();
    return json;
});
exports.fetchUserByUsername = fetchUserByUsername;
// fetch user by id
const fetchUserByUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/users/${userID}`);
    const json = yield res.json();
    return json;
});
exports.fetchUserByUserID = fetchUserByUserID;
