const { client } = require('../client');
const bcrypt = require('bcrypt');

interface User { 
  username: string, 
  password: string, 
  avatar: string,
  id: number
};

// create user
const createUser = async ({username, password, avatar}:User) => {
  try {
    const SALT_COUNT = 10;

    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const { rows: user } = await client.query(`
    INSERT INTO users(username, password, avatar)
    VALUES ($1, $2, $3)
    RETURNING id, username, avatar
    `, [username, hashedPassword, avatar])

    return user
  } catch (error) {
    console.error(error)
  }
};

// get user by username
const getUserByUsername = async (username:string) => {
  try {
    const { rows: user } = await client.query(`
    SELECT username FROM users 
    WHERE username = $1
    `, [username]);

    return user
  } catch (error) {
    console.error(error);
  }
};

// get single user *authentication
const getUser = async ({username, password}:User) => {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;

    // const { rows: user } = await client.query(`
    // SELECT * FROM users
    // RETURNING username, password
    // `)
    // can i do this way?
    //SELECT username FROM users

    const isValid = await bcrypt.compare(password, hashedPassword)

    if (isValid) {
      return user
    } 
  } catch (error) {
    console.error(error);
  }
}

// get user by id
const getUserById = async ({id}:User) => {
  try {
    const { rows: user } = await client.query(`
    SELECT id FROM users
    WHERE id = $1
    `, [id])

    return user;
  } catch (error) {
    console.error(error);
  }
}

// get all users

// edit user

// delete/deactivate user

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  getUserById
}