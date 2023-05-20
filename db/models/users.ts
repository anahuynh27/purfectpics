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
    const { rows: [user] } = await client.query(`
    SELECT username, password FROM users 
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
const getAllUsers = async () => {
  try {
    console.log('got in here get all users')
    const { rows: user } = await client.query(`
    SELECT username FROM users
    `)

    return user;
  } catch (error) {
    console.error(error);
  }
}

// edit user
const updateUser = async ({id}:User, ...fields:any) => {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");
    
    const { rows: user } = await client.query(`
    UPDATE users
    SET ${setString}
    WHERE id = ${id}
    RETURNING *
    `, Object.values(fields));

    return user; 
  } catch (error) {
    console.error(error);
  };
}

// delete/deactivate user
const deleteUser = async ({id}:User) => {
  try {
    const { rows: user } = await client.query(`
    UPDATE users
    SET "isActive" = 'false'
    WHERE id =${id}
    `, [id]);

    return user;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
}