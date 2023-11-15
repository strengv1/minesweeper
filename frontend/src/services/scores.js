import axios from 'axios'

// baseurl if running locally: https://localhost:3001/api/
const createBeginner = (newObject) => {
  const request = axios.post(`https://minesweeper-db.onrender.com/api/beginner`, newObject)
  return request.then(response => response.data)
}

const getBeginner = () => {
  const request = axios.get(`https://minesweeper-db.onrender.com/api/beginner`)
  return request.then(response => response.data)
}
const createIntermediate = (newObject) => {
  const request = axios.post(`https://minesweeper-db.onrender.com/api/intermediate`, newObject)
  return request.then(response => response.data)
}

const getIntermediate = () => {
  const request = axios.get(`https://minesweeper-db.onrender.com/api/intermediate`)
  return request.then(response => response.data)
}
const createExtreme = (newObject) => {
  const request = axios.post(`https://minesweeper-db.onrender.com/api/extreme`, newObject)
  return request.then(response => response.data)
}

const getExtreme = () => {
  const request = axios.get(`https://minesweeper-db.onrender.com/api/extreme`)
  return request.then(response => response.data)
}

// eslint-disable-next-line
export default {
  createBeginner,
  getBeginner,
  createIntermediate,
  getIntermediate,
  createExtreme,
  getExtreme
}