const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const registerRoutes = require('./routes/Register');
const convertRoutes = require('./routes/convert'); // Import the new convert route
const conversionHistoryRoutes = require('./routes/conversionHistory');
const profileRoutes = require('./routes/profile');

const app = express();



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
  res.json('Hello World');
})

app.get('/test', (req,res)=>{
  res.status(200).json('Test successfull!!!');
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', registerRoutes);
app.use('/convert', convertRoutes);
app.use('/conversion-history', conversionHistoryRoutes);
app.use('/api/auth', profileRoutes);



// Database onnection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('DB Connection Error:', error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
