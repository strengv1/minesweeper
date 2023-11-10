require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 2
  },
  time: {
    type: Number
  },
})

scoreSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Beginner = mongoose.model('Beginner', scoreSchema)
const Intermediate = mongoose.model('Intermediate', scoreSchema)
const Extreme = mongoose.model('Extreme', scoreSchema)

module.exports = {
  Beginner, Intermediate, Extreme
}
