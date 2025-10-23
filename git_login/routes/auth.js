const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Step 1: Redirect user to GitHub login page
router.get('/github/login', (req, res) => {
  const redirect_uri = 'http://localhost:5000/auth/github/callback';
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}`;
  res.redirect(githubAuthUrl);
});

// Step 2: GitHub redirects here with ?code=...
router.get('/github/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: { Accept: 'application/json' }
      }
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) return res.status(400).json({ error: 'No access token received from GitHub' });

    // Fetch user data from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    // Optional: fetch user’s email (GitHub may keep it private)
    const emailResponse = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const primaryEmail = emailResponse.data.find(e => e.primary)?.email || null;

    const { id, login } = userResponse.data;

    // Check DB if user already exists
    let user = await User.findOne({ githubId: id });
    if (!user) {
      user = new User({
        githubId: id,
        username: login,
        email: primaryEmail
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, githubId: id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send token + user info back
    res.json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    console.error('GitHub OAuth failed:', error.message);
    res.status(500).json({ error: 'GitHub OAuth failed' });
  }
});

module.exports = router;
