require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'GitHub Login API is running 🚀' });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Server running on port ${process.env.PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
