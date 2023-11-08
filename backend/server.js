require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Score = require('./models/score')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// Get all
app.get('/api/leaderboard', (req, res, next) => {
  Score.find({}).then(scores => {
    res.json(scores)
  })
    .catch(error => next(error))
})

// Add new
app.post('/api/leaderboard', (request, response, next) => {
  const body = request.body
  if (body.username === undefined || (body.time === undefined) ) {
    return response.status(400).json({
      error: 'username or time missing'
    })
  }

  const score = new Score({
    username: body.username,
    time: body.time
  })

  score.save()
    .then(savedScore => {
      response.json(savedScore)
    })
    .catch(error => next(error))
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
