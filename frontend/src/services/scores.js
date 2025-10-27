import axios from 'axios'
import config from '../config'

const createBeginner = async (newObject) => {
  const request = axios.post(`${config.API_URL}/api/beginner`, newObject)
  return request.then(response => response.data)
}

const getBeginner = async () => {
  const request = axios.get(`${config.API_URL}/api/beginner`)
  return request.then(response => response.data)
}

const createIntermediate = async (newObject) => {
  const request = axios.post(`${config.API_URL}/api/intermediate`, newObject)
  return request.then(response => response.data)
}

const getIntermediate = async () => {
  const request = axios.get(`${config.API_URL}/api/intermediate`)
  return request.then(response => response.data)
}

const createExtreme = async (newObject) => {
  const request = axios.post(`${config.API_URL}/api/extreme`, newObject)
  return request.then(response => response.data)
}

const getExtreme = async () => {
  const request = axios.get(`${config.API_URL}/api/extreme`)
  return request.then(response => response.data)
}

const scoresService = {
  createBeginner,
  getBeginner,
  createIntermediate,
  getIntermediate,
  createExtreme,
  getExtreme
}

export default scoresService