const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2200
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: String // Array of usernames who liked the post
  }],
  sharedBy: [{
    type: String // Array of usernames who shared the post
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
postSchema.index({ createdAt: -1 });
postSchema.index({ username: 1 });

// Virtual for formatted date
postSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
});

// Method to toggle like
postSchema.methods.toggleLike = function(username) {
  const userIndex = this.likedBy.indexOf(username);
  
  if (userIndex === -1) {
    // User hasn't liked, add like
    this.likedBy.push(username);
    this.likes += 1;
  } else {
    // User has liked, remove like
    this.likedBy.splice(userIndex, 1);
    this.likes -= 1;
  }
  
  return this.save();
};

// Method to add share
postSchema.methods.addShare = function(username) {
  if (!this.sharedBy.includes(username)) {
    this.sharedBy.push(username);
    this.shares += 1;
    return this.save();
  }
  return Promise.resolve(this);
};

module.exports = mongoose.model('Post', postSchema);
