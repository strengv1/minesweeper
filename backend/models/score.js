const mongoose = require('mongoose');

if (mongoose.connection.readyState === 0) {
  const url = process.env.MONGODB_URI;
  
  if (url) {
    mongoose.connect(url)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
      });
  }
}

const scoreSchema = new mongoose.Schema({
  username: String,
  time: Number,
  date: { type: Date, default: Date.now }
});


const Beginner = mongoose.model('Beginner', scoreSchema);
const Intermediate = mongoose.model('Intermediate', scoreSchema);
const Extreme = mongoose.model('Extreme', scoreSchema);

module.exports = {
  Beginner,
  Intermediate,
  Extreme
};