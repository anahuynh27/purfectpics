// local server
export const APIURL = 'http://localhost:3000/api'

// login user 
export const fetchLogin = async (username: string, password: string) => {
  const res = await fetch(`${APIURL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`
    }),
  });
  const json = await res.json()
  return json
}

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
  const json = await res.json()
  return json
}

// fetch all users
export const fetchUsers = async () => {
  const res = await fetch(`${APIURL}/users/all`)
  const json = await res.json()
  return json
}