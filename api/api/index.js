const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('../routes/auth');
const registerRoutes = require('../routes/Register');
const convertRoutes = require('../routes/convert');
const conversionHistoryRoutes = require('../routes/conversionHistory');
const profileRoutes = require('../routes/profile');

const app = express();

// Connect DB (on each invocation in serverless env)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('MongoDB Error:', error));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.json('Hello World'));
app.get('/test', (req, res) => res.status(200).json('Test successful!'));

app.use('/api/auth', authRoutes);
app.use('/api/auth', registerRoutes);
app.use('/convert', convertRoutes);
app.use('/conversion-history', conversionHistoryRoutes);
app.use('/api/auth', profileRoutes);

module.exports = app;
