const OpenAI = require('openai');

// Initialize OpenAI client only if API key is provided
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

// Generate AI caption for an image
async function generateCaption(imageDescription) {
  try {
    if (!openai) {
      // Fallback captions if no API key
      const fallbackCaptions = [
        "Living my best life! ✨",
        "Perfect moment captured 📸",
        "Life is beautiful 🌟",
        "Making memories that last forever 💫",
        "Adventure awaits! 🚀",
        "Grateful for this moment 🙏",
        "Living in the present ✨",
        "Beautiful day, beautiful life 🌞",
        "Chasing dreams and capturing moments 📷",
        "Life is a journey, not a destination 🛤️"
      ];
      return fallbackCaptions[Math.floor(Math.random() * fallbackCaptions.length)];
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative social media caption generator. Generate engaging, Instagram-style captions that are positive, relatable, and include relevant emojis. Keep captions under 200 characters."
        },
        {
          role: "user",
          content: `Generate a creative Instagram caption for: ${imageDescription}`
        }
      ],
      max_tokens: 100,
      temperature: 0.8
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating caption:', error);
    // Fallback caption
    return "Living my best life! ✨";
  }
}

// Generate AI username
function generateUsername() {
  const adjectives = [
    'creative', 'adventurous', 'dreamy', 'vibrant', 'serene', 
    'bold', 'mystical', 'radiant', 'cosmic', 'ethereal',
    'wild', 'peaceful', 'energetic', 'charming', 'witty'
  ];
  
  const nouns = [
    'explorer', 'dreamer', 'artist', 'wanderer', 'creator',
    'adventurer', 'photographer', 'traveler', 'storyteller', 'visionary',
    'soul', 'spirit', 'heart', 'mind', 'journey'
  ];
  
  const numbers = Math.floor(Math.random() * 999) + 1;
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective}_${noun}_${numbers}`;
}

// Generate random location
function generateLocation() {
  const locations = [
    'New York, NY', 'Los Angeles, CA', 'San Francisco, CA', 'Miami, FL',
    'Chicago, IL', 'Seattle, WA', 'Austin, TX', 'Denver, CO',
    'Portland, OR', 'Nashville, TN', 'New Orleans, LA', 'Las Vegas, NV',
    'Boston, MA', 'Philadelphia, PA', 'Washington, DC', 'Atlanta, GA',
    'Phoenix, AZ', 'Dallas, TX', 'Houston, TX', 'San Diego, CA',
    'Paris, France', 'London, UK', 'Tokyo, Japan', 'Sydney, Australia',
    'Barcelona, Spain', 'Rome, Italy', 'Amsterdam, Netherlands', 'Berlin, Germany',
    'Vancouver, Canada', 'Toronto, Canada', 'Mexico City, Mexico', 'Rio de Janeiro, Brazil'
  ];
  
  return locations[Math.floor(Math.random() * locations.length)];
}

// Generate random image URL from Unsplash
function generateImageUrl() {
  const categories = [
    'nature', 'city', 'food', 'travel', 'architecture', 
    'people', 'animals', 'technology', 'fashion', 'art'
  ];
  
  const category = categories[Math.floor(Math.random() * categories.length)];
  const width = 800;
  const height = 600;
  
  return `https://source.unsplash.com/random/${width}x${height}/?${category}`;
}

// Generate seed data for posts
async function generateSeedData(count = 20) {
  const seedData = [];
  
  for (let i = 0; i < count; i++) {
    const username = generateUsername();
    const imageUrl = generateImageUrl();
    const location = generateLocation();
    
    // Generate a random image description for caption generation
    const imageDescriptions = [
      'a beautiful sunset over mountains',
      'a cozy coffee shop interior',
      'a vibrant street art mural',
      'a peaceful beach at dawn',
      'a bustling city street',
      'a serene forest path',
      'a delicious plate of food',
      'a stunning architectural building',
      'a cute pet portrait',
      'a colorful flower garden'
    ];
    
    const imageDescription = imageDescriptions[Math.floor(Math.random() * imageDescriptions.length)];
    const caption = await generateCaption(imageDescription);
    
    // Generate random likes and shares
    const likes = Math.floor(Math.random() * 500) + 10;
    const shares = Math.floor(Math.random() * 50) + 1;
    
    // Generate random timestamp within the last 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const randomTime = new Date(thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime()));
    
    seedData.push({
      username,
      imageUrl,
      caption,
      location,
      likes,
      shares,
      likedBy: [],
      sharedBy: [],
      createdAt: randomTime
    });
  }
  
  return seedData;
}

module.exports = {
  generateCaption,
  generateUsername,
  generateLocation,
  generateImageUrl,
  generateSeedData
};
