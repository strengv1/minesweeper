import axios from 'axios'

const create = (newObject) => {
  const request = axios.post(`http://localhost:3001/api/leaderboard`, newObject)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(`http://localhost:3001/api/leaderboard`)
  return request.then(response => response.data)
}

// eslint-disable-next-line
export default {
  getAll,
  create
}