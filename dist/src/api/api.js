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
exports.fetchPostsByUserID = exports.fetchPostById = exports.fetchAllActivePosts = exports.fetchAllPosts = exports.fetchEditPost = exports.fetchCreatePosts = exports.fetchUserByUserID = exports.fetchUserByUsername = exports.fetchUsers = exports.fetchRegister = exports.fetchLogin = exports.APIURL = void 0;
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
// fetch create post
const fetchCreatePosts = (title, photo, content, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/posts/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: `${title}`,
            photo: `${photo}`,
            content: `${content}`,
        }),
    });
    const json = yield res.json();
    return json;
});
exports.fetchCreatePosts = fetchCreatePosts;
// fetch edit post
const fetchEditPost = (postID, title, photo, content, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/posts/edit/${postID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: `${title}`,
            photo: `${photo}`,
            content: `${content}`,
        }),
    });
    const json = res.json();
    return json;
});
exports.fetchEditPost = fetchEditPost;
// fetch all posts
const fetchAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/posts/`);
    const json = yield res.json();
    return json;
});
exports.fetchAllPosts = fetchAllPosts;
// fetch all active posts
const fetchAllActivePosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/posts/active`);
    const json = yield res.json();
    return json;
});
exports.fetchAllActivePosts = fetchAllActivePosts;
// fetch post by id
const fetchPostById = (postID) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/posts/${postID}`);
    const json = yield res.json();
    return json;
});
exports.fetchPostById = fetchPostById;
// fetch posts by user id
const fetchPostsByUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.APIURL}/posts/users/${userID}`);
    const json = yield res.json();
    return json;
});
exports.fetchPostsByUserID = fetchPostsByUserID;
