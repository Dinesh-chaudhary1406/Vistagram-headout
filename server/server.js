const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Vistagram API is running!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vistagram', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 2000,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 API available at http://localhost:${PORT}/api`);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  console.log('💡 To fix this:');
  console.log('   1. Install MongoDB: https://www.mongodb.com/try/download/community');
  console.log('   2. Or use MongoDB Atlas: https://www.mongodb.com/atlas');
  console.log('   3. Or set MONGODB_URI environment variable');
  
  // Start server anyway for testing (will fail on database operations)
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} (without database)`);
    console.log(`📱 API available at http://localhost:${PORT}/api`);
    console.log('⚠️  Database operations will fail until MongoDB is connected');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
