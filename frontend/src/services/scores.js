import axios from 'axios'

const createBeginner = (newObject) => {
  const request = axios.post(`http://localhost:3001/api/beginner`, newObject)
  return request.then(response => response.data)
}

const getBeginner = () => {
  const request = axios.get(`http://localhost:3001/api/beginner`)
  return request.then(response => response.data)
}
const createIntermediate = (newObject) => {
  const request = axios.post(`http://localhost:3001/api/intermediate`, newObject)
  return request.then(response => response.data)
}

const getIntermediate = () => {
  const request = axios.get(`http://localhost:3001/api/intermediate`)
  return request.then(response => response.data)
}
const createExtreme = (newObject) => {
  const request = axios.post(`http://localhost:3001/api/extreme`, newObject)
  return request.then(response => response.data)
}

const getExtreme = () => {
  const request = axios.get(`http://localhost:3001/api/extreme`)
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