
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const { Beginner, Intermediate, Extreme } = require('./models/score')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// Get beginners
app.get('/api/beginner', (req, res, next) => {
  Beginner.find({}).then(scores => {
    res.json(scores)
  })
    .catch(error => next(error))
})
// Add new Beginner
app.post('/api/beginner', (request, response, next) => {
  const body = request.body
  if (body.username === undefined || (body.time === undefined) ) {
    return response.status(400).json({
      error: 'username or time missing'
    })
  }
  const score = new Beginner({
    username: body.username,
    time: body.time
  })
  score.save()
    .then(savedScore => {
      response.json(savedScore)
    })
    .catch(error => next(error))
})

// Get intermediates
app.get('/api/intermediate', (req, res, next) => {
  Intermediate.find({}).then(scores => {
    res.json(scores)
  })
    .catch(error => next(error))
})
// Add new Intermediate
app.post('/api/intermediate', (request, response, next) => {
  const body = request.body
  if (body.username === undefined || (body.time === undefined) ) {
    return response.status(400).json({
      error: 'username or time missing'
    })
  }
  const score = new Intermediate({
    username: body.username,
    time: body.time
  })
  score.save()
    .then(savedScore => {
      response.json(savedScore)
    })
    .catch(error => next(error))
})

// Get extremes
app.get('/api/extreme', (req, res, next) => {
  Extreme.find({}).then(scores => {
    res.json(scores)
  })
    .catch(error => next(error))
})
// Add new Extreme
app.post('/api/extreme', (request, response, next) => {
  const body = request.body
  if (body.username === undefined || (body.time === undefined) ) {
    return response.status(400).json({
      error: 'username or time missing'
    })
  }
  const score = new Extreme({
    username: body.username,
    time: body.time
  })
  score.save()
    .then(savedScore => {
      response.json(savedScore)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
