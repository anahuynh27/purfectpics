const { client } = require('../client');
const bcrypt = require('bcrypt');

// interface
interface User { 
  username: string, 
  password?: string, 
  avatar: string,
  userID: number
};

// create user
const createUser = async ({username, password, avatar}: User) => {
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


// get single user *authentication
const getUser = async ({username, password}: User) => {
  try {
    const user: User = await getUserByUsername(username);
    const hashedPassword = user.password;
    const isValid: boolean = await bcrypt.compare(password, hashedPassword);

    if (isValid) {
      delete user.password
      return user
    } else {
      throw new Error('Invalid username or password')
    }
  } catch (error) {
    console.error(error);
  }
}

// get user by username
const getUserByUsername = async (username: string) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT id, username, password, avatar FROM users 
    WHERE username = $1
    `, [username]);

    return user
  } catch (error) {
    console.error(error);
  }
};

// get user by id
const getUserById = async (userID: User) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT id, username, avatar FROM users
    WHERE id = $1
    `, [userID])

    return user;
  } catch (error) {
    console.error(error);
  }
}

// get all users
const getAllUsers = async () => {
  try {
    const { rows: users } = await client.query(`
    SELECT id, username, avatar FROM users
    `)

    return users;
  } catch (error) {
    console.error(error);
  }
}

// edit user
const updateUser = async (userID: User, fields: User) => {
  try {
    // updated password needs to be hashed
    const SALT_COUNT = 10;
    const password = fields.password;

    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    fields.password = hashedPassword;

    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    const { rows: [user] } = await client.query(`
    UPDATE users
    SET ${setString}
    WHERE id = ${userID}
    RETURNING *
    `, Object.values(fields));

    delete user.password;

    return user; 
  } catch (error) {
    console.error(error);
  };
}

// delete/deactivate user
const deleteUser = async (userID: User) => {
  try {
    const { rows: user } = await client.query(`
    UPDATE users
    SET "isActive" = 'false'
    WHERE id =${userID}
    `, [userID]);

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