// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ec } = require('elliptic');
const EC = new ec('secp256k1');
const crypto = require('crypto');
const { sendLoginNotification } = require('../emailService');

// Helper: SHA256 hash
const hashCatchphrase = (catchphrase) => {
  return crypto.createHash('sha256').update(catchphrase).digest('hex');
};

// 👉 Registration Route
router.post('/register', async (req, res) => {
  const { email, username, catchphrase } = req.body;
  if (!email || !username || !catchphrase) return res.status(400).json({ error: 'All fields required' });

  const privateKey = hashCatchphrase(catchphrase);
  const key = EC.keyFromPrivate(privateKey);
  const publicKey = key.getPublic('hex');

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: 'User already exists' });

    const newUser = new User({ email, username, publicKey });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 👉 Login Route

router.post('/login', async (req, res) => {
  const { catchphrase } = req.body;
  if (!catchphrase) return res.status(400).json({ error: 'Catchphrase is required' });

  const privateKey = hashCatchphrase(catchphrase);
  const key = EC.keyFromPrivate(privateKey);
  const publicKey = key.getPublic('hex');

  try {
    const user = await User.findOne({ publicKey });
    if (!user) return res.status(401).json({ error: 'Authentication failed' });

    // 🔔 Send login notification email
    await sendLoginNotification(user.email, user.username);

    res.status(200).json({
      message: 'Login successful',
      username: user.username,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
