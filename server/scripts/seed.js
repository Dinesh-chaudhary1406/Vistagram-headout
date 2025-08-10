const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('../models/Post');
const { generateSeedData } = require('../utils/ai');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vistagram', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB for seeding');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing posts
    await Post.deleteMany({});
    console.log('🗑️  Cleared existing posts');
    
    // Generate seed data
    console.log('📝 Generating seed data...');
    const seedData = await generateSeedData(25); // Generate 25 posts
    
    // Insert seed data
    console.log('💾 Inserting seed data...');
    const posts = await Post.insertMany(seedData);
    
    console.log(`✅ Successfully seeded ${posts.length} posts!`);
    console.log('📊 Database now contains:');
    console.log(`   - ${posts.length} posts`);
    
    // Show some sample posts
    console.log('\n📸 Sample posts created:');
    posts.slice(0, 3).forEach((post, index) => {
      console.log(`   ${index + 1}. @${post.username}: "${post.caption}"`);
      console.log(`      📍 ${post.location} | ❤️ ${post.likes} | 🔄 ${post.shares}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
