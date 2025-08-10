# 📸 Vistagram - Instagram-Style Social Media App

A beautiful, modern social media application built with React, Node.js, and MongoDB. Share your moments with stunning photos, engaging captions, and connect with others through likes and shares.

## ✨ Features

- **📱 Camera Integration**: Capture photos directly from your device camera
- **🖼️ Image Upload**: Upload images with drag-and-drop support
- **📝 AI-Generated Captions**: Automatic caption generation using OpenAI API
- **❤️ Like & Share**: Interactive social features with real-time counters
- **📍 Location Tagging**: Add location information to your posts
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **⚡ Real-time Updates**: Instant feedback on interactions
- **🎨 Modern UI**: Instagram-inspired design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Multer** - File upload handling
- **OpenAI API** - AI caption generation
- **JWT** - Authentication

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- OpenAI API key (optional, for AI captions)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vistagram
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment example
   cp env.example .env
   
   # Edit .env file with your configuration
   # - MongoDB URI
   # - OpenAI API key (optional)
   # - JWT secret
   ```

4. **Start the development servers**
   ```bash
   # Start backend server (from server directory)
   cd server
   npm run dev
   
   # Start frontend server (from client directory)
   cd client
   npm run dev
   ```

5. **Seed the database (optional)**
   ```bash
   # From server directory
   npm run seed
   ```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
vistagram/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── scripts/           # Database scripts
│   ├── uploads/           # Image uploads
│   └── server.js
├── env.example            # Environment variables template
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/vistagram

# OpenAI API Configuration (optional)
OPENAI_API_KEY=your_openai_api_key_here

# JWT Secret
JWT_SECRET=your_jwt_secret_here
```

### MongoDB Setup

1. **Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service
   - Use connection string: `mongodb://localhost:27017/vistagram`

2. **MongoDB Atlas (Cloud)**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Get your connection string
   - Replace `MONGODB_URI` in `.env`

## 📱 Usage

### Creating Posts
1. Navigate to the "Create Post" page
2. Choose between camera capture or file upload
3. Add a username and caption
4. Optionally add a location
5. Submit your post

### Interacting with Posts
- **Like/Unlike**: Click the heart icon
- **Share**: Click the share icon to copy the post link
- **View Details**: Click "View Details" for full post view

### Camera Features
- **Permission**: Grant camera access when prompted
- **Capture**: Click the capture button to take a photo
- **Retake**: Use the retake button if needed

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variables
3. Deploy

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_secure_jwt_secret
```

## 🔌 API Endpoints

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `POST /api/posts/:id/like` - Toggle like
- `POST /api/posts/:id/share` - Share post

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

## 🎨 Customization

### Styling
- Modify `client/src/index.css` for global styles
- Update `client/tailwind.config.js` for theme customization
- Edit component styles in individual files

### Features
- Add new API endpoints in `server/routes/`
- Create new components in `client/src/components/`
- Extend database models in `server/models/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your environment variables
3. Ensure MongoDB is running
4. Check API endpoints are accessible

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for sample images
- [OpenAI](https://openai.com) for AI caption generation
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Framer Motion](https://framer.com/motion) for animations
