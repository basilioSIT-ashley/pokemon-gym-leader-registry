
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const GymLeader = require('./models/GymLeader');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Gym Leader Registry API is running!' });
});

// GET all Gym Leaders
app.get('/api/leaders', async (req, res) => {
  try {
    const leaders = await GymLeader.find();
    res.status(200).json(leaders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Gym Leaders.' });
  }
});

// GET one Gym Leader
app.get('/api/leaders/:id', async (req, res) => {
  try {
    const leader = await GymLeader.findById(req.params.id);

    if (!leader) {
      return res.status(404).json({ message: 'Gym Leader not found.' });
    }

    res.status(200).json(leader);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Gym Leader not found.' });
    }
    res.status(500).json({ message: 'Failed to fetch Gym Leader.' });
  }
});

// POST create a Gym Leader
app.post('/api/leaders', async (req, res) => {
  try {
    const leader = await GymLeader.create(req.body);
    res.status(201).json(leader);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to create Gym Leader.' });
  }
});

// PUT update a Gym Leader
app.put('/api/leaders/:id', async (req, res) => {
  try {
    const leader = await GymLeader.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!leader) {
      return res.status(404).json({ message: 'Gym Leader not found.' });
    }

    res.status(200).json(leader);
  } catch (error) {
    if (
      error.name === 'ValidationError' ||
      error.name === 'CastError'
    ) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to update Gym Leader.' });
  }
});

// DELETE a Gym Leader
app.delete('/api/leaders/:id', async (req, res) => {
  try {
    const leader = await GymLeader.findByIdAndDelete(req.params.id);

    if (!leader) {
      return res.status(404).json({ message: 'Gym Leader not found.' });
    }

    res.status(200).json({
      message: `${leader.name} has been removed from the registry.`
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Gym Leader not found.' });
    }
    res.status(500).json({ message: 'Failed to delete Gym Leader.' });
  }
});

// Connect to MongoDB before starting the server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas!');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
