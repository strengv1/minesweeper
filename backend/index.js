const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  if (req.body && Buffer.isBuffer(req.body)) {
    try {
      const bodyString = req.body.toString('utf-8');
      req.body = JSON.parse(bodyString);
    } catch (e) {
      console.error('Failed to parse Buffer body:', e);
    }
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  
  console.log('Connected to MongoDB');
  cachedDb = mongoose.connection;
  return cachedDb;
}

const { Beginner, Intermediate, Extreme } = require('./models/score');

// DB connection middleware
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('DB connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
app.get('/api/beginner', async (req, res, next) => {
  try {
    const scores = await Beginner.find({});
    res.json(scores);
  } catch (error) {
    next(error);
  }
});

app.post('/api/beginner', async (req, res, next) => {
  try {
    console.log('Received body:', req.body);
    
    const { username, time } = req.body;
    
    if (!username || !time) {
      return res.status(400).json({
        error: 'username or time missing',
        received: req.body
      });
    }
    
    const score = new Beginner({ username, time });
    const savedScore = await score.save();
    res.json(savedScore);
  } catch (error) {
    next(error);
  }
});

app.get('/api/intermediate', async (req, res, next) => {
  try {
    const scores = await Intermediate.find({});
    res.json(scores);
  } catch (error) {
    next(error);
  }
});

app.post('/api/intermediate', async (req, res, next) => {
  try {
    const { username, time } = req.body;
    
    if (!username || !time) {
      return res.status(400).json({ error: 'username or time missing' });
    }
    
    const score = new Intermediate({ username, time });
    const savedScore = await score.save();
    res.json(savedScore);
  } catch (error) {
    next(error);
  }
});

app.get('/api/extreme', async (req, res, next) => {
  try {
    const scores = await Extreme.find({});
    res.json(scores);
  } catch (error) {
    next(error);
  }
});

app.post('/api/extreme', async (req, res, next) => {
  try {
    const { username, time } = req.body;
    
    if (!username || !time) {
      return res.status(400).json({ error: 'username or time missing' });
    }
    
    const score = new Extreme({ username, time });
    const savedScore = await score.save();
    res.json(savedScore);
  } catch (error) {
    next(error);
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ error: error.message });
});

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  return handler(event, context);
};