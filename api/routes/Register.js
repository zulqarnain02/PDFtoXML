const express = require('express');
const user = require('../models/user');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const bcrypt = require('bcrypt');

// Registration Route
router.post('/register', async (req, res) => {

    console.log("hello everone i am in registration");
    const { email, password, ...rest } = req.body;
  console.log(req.body);
  
    try {
      const existingUser = await user.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email is already used' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new user({ email, password: hashedPassword, ...rest });
      await newUser.save();
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error',error });
    }
  });

module.exports = router;