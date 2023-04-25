const { client } = require('../client')

// create user
const createUser = async (username: string, password: string, avatar: string) => {
  try {
    const { rows: user } = await client.query(`
    INSERT INTO users(username, password, avatar)
    VALUES ($1, $2, $3)
    RETURNING id, username, avatar
    `, [username, password, avatar])

    return user
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  createUser
}