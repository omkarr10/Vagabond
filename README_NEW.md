# 🏔️ VGBND - AI Travel Planner

> Your intelligent companion for planning unforgettable travel experiences in Maharashtra and beyond.

[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.15-green.svg)](https://www.mongodb.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-orange.svg)](https://openai.com/)

## ✨ New Features

### 🔐 Secure JWT Authentication
- JWT-based authentication with refresh tokens (7-day access, 30-day refresh)
- Bcrypt password hashing (10 salt rounds)
- Role-based access control (User/Admin)
- Protected routes and persistent sessions
- Automatic token refresh
- Secure logout functionality

### 🤖 AI-Powered Itinerary Generation
- Personalized trip planning powered by OpenAI GPT-3.5-turbo
- **Customizable parameters:**
  - 📍 Destination selection
  - ⏱️ Duration (1-30 days)
  - 💰 Budget tiers (budget/moderate/luxury)
  - 🎯 Interests (adventure, culture, food, nature, photography, shopping, nightlife, history, art, relaxation)
  - 👥 Group size (solo/couple/family/group)
  - 📅 Travel dates
- **Generates:**
  - Detailed day-by-day schedules
  - Activity recommendations with timing and costs
  - Restaurant suggestions for breakfast, lunch, and dinner
  - Local tips and insights
  - Packing lists
  - Important travel notes
- **Features:**
  - Save and manage multiple itineraries
  - View saved itineraries anytime
  - Delete unwanted itineraries
  - Print or export to PDF

### 📊 User Dashboard
- Welcome screen with personalized greeting
- Total itineraries count
- Account type display (User/Admin)
- Recent itineraries preview (last 3)
- Quick action buttons
- Easy navigation to all features

### 🏕️ Destination Explorer (Existing)
- Comprehensive camp and trek listings
- Beautiful image galleries
- Detailed destination information
- Easy booking system

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or Atlas)
- OpenAI API key ([Get one here](https://platform.openai.com/))

### Installation

1. **Clone and install**
```bash
git clone https://github.com/omkarr10/vgbnd.git
cd vgbnd
npm install
```

2. **Configure environment**
```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` with your credentials:
```env
MONGO_URI=mongodb://localhost:27017/vgbnd
JWT_SECRET=your-super-secret-jwt-key-32-chars-minimum
JWT_REFRESH_SECRET=your-refresh-secret-different-from-jwt-secret
OPENAI_API_KEY=sk-your-openai-api-key-here
PORT=5000
NODE_ENV=development
```

📖 See [ENV_SETUP.md](ENV_SETUP.md) for detailed configuration guide.

3. **Start MongoDB**
```bash
mongod
```

4. **Run the application**
```bash
# Development mode (Electron + Vite)
npm run dev

# Or start backend and frontend separately:
# Terminal 1
cd backend
node server.js

# Terminal 2
npm run start-vite
```

5. **Access the app**
- Web: http://localhost:5173
- Electron: Opens automatically

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Complete setup and installation guide |
| [QUICK_START.md](QUICK_START.md) | Get running in 5 minutes |
| [FEATURES.md](FEATURES.md) | Detailed feature documentation |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture and diagrams |
| [ENV_SETUP.md](ENV_SETUP.md) | Environment variables configuration |
| [TESTING.md](TESTING.md) | Testing checklist and procedures |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | Summary of new features |

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 19.1
- 🛣️ React Router DOM 7.6
- 🎨 Bootstrap 5.3
- 📡 Axios
- 🔔 React Toastify
- ✨ Framer Motion
- 🖼️ React Slick

### Backend
- 🚀 Express.js 5.1
- 🗄️ MongoDB + Mongoose 8.15
- 🔐 JWT (jsonwebtoken)
- 🔒 bcryptjs
- 🤖 OpenAI SDK
- 🌐 CORS
- ⚙️ dotenv

### Desktop
- 🖥️ Electron

## 📁 Project Structure

```
vgbnd/
├── backend/
│   ├── middleware/
│   │   └── auth.js              # JWT authentication & authorization
│   ├── models/
│   │   ├── User.js              # User schema with roles
│   │   ├── Itinerary.js         # AI itinerary schema
│   │   ├── Booking.js           # Booking schema
│   │   └── Contact.js           # Contact schema
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints (register, login, refresh)
│   │   ├── itinerary.js         # AI itinerary endpoints
│   │   ├── booking.js           # Booking endpoints
│   │   └── contact.js           # Contact endpoints
│   └── server.js                # Express server
├── src/
│   ├── components/
│   │   ├── Login.jsx            # Login/Register with JWT
│   │   ├── Dashboard.jsx        # User dashboard (NEW)
│   │   ├── AIItinerary.jsx      # AI itinerary generator (NEW)
│   │   ├── ProtectedRoute.jsx   # Route protection (NEW)
│   │   ├── NavBar.jsx           # Navigation with auth (NEW)
│   │   ├── Home.jsx
│   │   ├── Explore.jsx
│   │   ├── BookNow.jsx
│   │   └── ...destinations
│   ├── context/
│   │   └── AuthContext.jsx      # Global auth state (NEW)
│   ├── assets/
│   │   └── css/
│   ├── App.jsx
│   └── main.jsx
├── electron/
│   └── main.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── Documentation files (*.md)
```

## 🎯 API Endpoints

### 🔐 Authentication (`/api/auth`)
```http
POST   /register        # Create new account
POST   /login           # Login user
POST   /refresh         # Refresh access token
GET    /me              # Get current user (protected)
POST   /logout          # Logout (protected)
```

### 🤖 AI Itinerary (`/api/itinerary`)
```http
POST   /generate        # Generate AI itinerary (protected)
GET    /my-itineraries  # Get user's itineraries (protected)
GET    /:id             # Get specific itinerary (protected)
DELETE /:id             # Delete itinerary (protected)
```

### 📅 Bookings (`/api/bookings`)
```http
POST   /                # Create new booking
```

### 📧 Contact (`/api/contact`)
```http
POST   /                # Submit contact form
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT tokens with expiration (7 days access, 30 days refresh)
- ✅ Secure token storage (localStorage)
- ✅ Protected API routes with middleware
- ✅ Role-based authorization (user/admin)
- ✅ Input validation
- ✅ CORS configuration
- ✅ Environment variable protection (.env)
- ✅ Automatic token refresh

## 💡 Usage Examples

### Register & Login
1. Navigate to `/Login`
2. Click "Register" tab
3. Fill username, email, password (min 8 chars)
4. Accept privacy policy
5. Click "Register"
6. Auto-redirected after success

### Generate AI Itinerary
1. Login (required)
2. Navigate to `/AIItinerary` or click "AI Planner" in navbar
3. Fill the form:
   - Destination (e.g., "Lonavala")
   - Duration (e.g., 3 days)
   - Budget (budget/moderate/luxury)
   - Select interests (multiple)
   - Group size (solo/couple/family/group)
   - Start date
4. Click "Generate AI Itinerary"
5. Wait 5-15 seconds
6. View detailed itinerary
7. Print or save to PDF

### View Dashboard
1. Login
2. Navigate to `/Dashboard`
3. See your stats and recent itineraries
4. Quick access to all features

## 🧪 Testing

See [TESTING.md](TESTING.md) for comprehensive testing checklist.

Quick verification:
```bash
# Test backend
curl http://localhost:5000/

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"password123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"password123"}'
```

## 🚢 Deployment

### Production Checklist
- [ ] Generate strong JWT secrets (32+ characters)
- [ ] Use MongoDB Atlas for production
- [ ] Add OpenAI API key with billing configured
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Add rate limiting middleware
- [ ] Set up monitoring and logging
- [ ] Configure automated backups
- [ ] Update NODE_ENV to 'production'

### Deployment Platforms
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Backend:** Heroku, Railway, Render, AWS
- **Database:** MongoDB Atlas (free tier available)

## 🤝 Contributing

Private project. For authorized contributors:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open Pull Request

## 📄 License

Private - All rights reserved

## 👨‍💻 Author

**Omkar**
- GitHub: [@omkarr10](https://github.com/omkarr10)

## 🙏 Acknowledgments

- OpenAI for GPT-3.5 API
- MongoDB for database solutions
- React community
- All open-source contributors

## 🔮 Future Enhancements

- [ ] Social sharing and reviews
- [ ] Weather integration
- [ ] Interactive map with routes
- [ ] Payment gateway integration
- [ ] Email/SMS notifications
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] Currency converter
- [ ] Collaborative trip planning

## 📞 Support

- 📖 Documentation: Check the [docs folder](.)
- 🐛 Issues: Review [TESTING.md](TESTING.md)
- 💬 Contact: Reach out to development team

## 📊 Project Stats

- **21 files** created/modified
- **2 major features** implemented (JWT Auth + AI Itinerary)
- **9 API endpoints** for authentication and itineraries
- **5 new components** on frontend
- **6 documentation files** created

---

**Built with ❤️ using React, Node.js, MongoDB, and OpenAI**

*Making travel planning smarter, one itinerary at a time.* ✈️🌍🏔️

**[Live Site](https://vgbnd.vercel.app)** | **[Documentation](SETUP_GUIDE.md)** | **[Quick Start](QUICK_START.md)**
