import { json } from 'stream/consumers';

// local server
export const APIURL = 'http://localhost:3000/api';

// login user
export const fetchLogin = async (username: string, password: string) => {
  const res = await fetch(`${APIURL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
  });
  const json: object = await res.json();
  return json;
};

// register user
export const fetchRegister = async (username: string, password: string, avatar: string) => {
  const res = await fetch(`${APIURL}/users/register`, {
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
  const json: object = await res.json();
  return json;
};

// fetch all users
export const fetchUsers = async () => {
  const res = await fetch(`${APIURL}/users/all`);
  const json: object = await res.json();
  return json;
};

// fetch user by username
export const fetchUserByUsername = async (username: string) => {
  const res = await fetch(`${APIURL}/users/${username}`);
  const json: object = await res.json();
  return json;
};

// fetch user by id
export const fetchUserByUserID = async (userID: number) => {
  const res = await fetch(`${APIURL}/users/${userID}`);
  const json: object = await res.json();
  return json;
};

// fetch create post
export const fetchCreatePosts = async (
  title: string,
  photo: string,
  content: string,
  token: string
) => {
  const res = await fetch(`${APIURL}/posts/create`, {
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
  const json: object = await res.json();
  return json;
};

// fetch edit post
export const fetchEditPost = async (
  postID: number,
  title: string,
  photo: string,
  content: string,
  token: string
) => {
  const res = await fetch(`${APIURL}/posts/edit/${postID}`, {
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
  const json: object = res.json();
  return json;
};

// fetch all posts
export const fetchAllPosts = async () => {
  const res = await fetch(`${APIURL}/posts/`);
  const json: object = await res.json();
  return json;
};

// fetch all active posts
export const fetchAllActivePosts = async () => {
  const res = await fetch(`${APIURL}/posts/active`);
  const json: object = await res.json();
  return json;
};

// fetch post by id
export const fetchPostById = async (postID: number) => {
  const res = await fetch(`${APIURL}/posts/${postID}`);
  const json: object = await res.json();
  return json;
};

// fetch posts by user id
export const fetchPostsByUserID = async (userID: number) => {
  const res = await fetch(`${APIURL}/posts/users/${userID}`);
  const json: object = await res.json();
  return json;
};
