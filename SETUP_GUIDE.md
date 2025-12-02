# VGBND - AI Travel Planner

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- OpenAI API Key

### Installation

1. **Clone and Install Dependencies**
```bash
npm install
```

2. **Environment Configuration**

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_REFRESH_SECRET`: Secret key for refresh tokens
- `OPENAI_API_KEY`: Your OpenAI API key (get from https://platform.openai.com/)
- `PORT`: Backend server port (default: 5000)

3. **Start MongoDB** (if running locally)
```bash
mongod
```

4. **Run the Application**

For development (Electron desktop app):
```bash
npm run dev
```

This will start both Vite dev server and Electron app.

For production build:
```bash
npm run build
npm run package
```

## Features

### 🔐 JWT Authentication
- Secure user registration and login
- Password hashing with bcrypt
- Token-based authentication with refresh tokens
- Protected routes for authenticated users
- Role-based access control (user/admin)

### 🤖 AI-Generated Itinerary
- Personalized trip planning using OpenAI API
- Customizable parameters:
  - Destination
  - Duration (1-30 days)
  - Budget (budget/moderate/luxury)
  - Interests (adventure, culture, food, etc.)
  - Group size (solo, couple, family, group)
  - Travel dates
- Day-by-day schedules with:
  - Activity recommendations with timings
  - Restaurant suggestions (breakfast, lunch, dinner)
  - Estimated costs
  - Travel tips and local insights
- Save and manage multiple itineraries
- Print/export functionality

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

#### Itinerary
- `POST /api/itinerary/generate` - Generate AI itinerary (protected)
- `GET /api/itinerary/my-itineraries` - Get user's saved itineraries (protected)
- `GET /api/itinerary/:id` - Get specific itinerary (protected)
- `DELETE /api/itinerary/:id` - Delete itinerary (protected)

#### Bookings
- `POST /api/bookings` - Create booking

#### Contact
- `POST /api/contact` - Submit contact form

## Project Structure

```
vgbnd/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── models/
│   │   ├── User.js          # User model with roles
│   │   ├── Itinerary.js     # Itinerary model
│   │   ├── Booking.js       # Booking model
│   │   └── Contact.js       # Contact model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── itinerary.js     # AI itinerary routes
│   │   ├── booking.js       # Booking routes
│   │   └── contact.js       # Contact routes
│   └── server.js            # Express server
├── src/
│   ├── components/
│   │   ├── Login.jsx        # Login/Register component
│   │   ├── AIItinerary.jsx  # AI itinerary generator
│   │   ├── NavBar.jsx       # Navigation bar
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   └── ...              # Other components
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── electron/
│   └── main.js              # Electron main process
├── .env.example
├── package.json
└── README.md
```

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB & Mongoose - Database
- JWT (jsonwebtoken) - Authentication
- bcryptjs - Password hashing
- OpenAI API - AI itinerary generation
- CORS - Cross-origin resource sharing

### Frontend
- React 19 - UI framework
- React Router DOM - Routing
- Axios - HTTP client
- React Toastify - Notifications
- Bootstrap 5 - UI components
- Framer Motion - Animations

### Desktop
- Electron - Desktop application wrapper

## Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT token expiration (7 days for access, 30 days for refresh)
- Protected API routes with authentication middleware
- Role-based access control
- Secure token storage in localStorage
- Automatic token refresh on expiration

## Usage

1. **Register/Login**: Create an account or login to access protected features
2. **Explore Destinations**: Browse available camps and treks
3. **Generate AI Itinerary**: 
   - Navigate to "AI Planner" (requires login)
   - Fill in your travel preferences
   - Click "Generate AI Itinerary"
   - View, save, or print your personalized itinerary
4. **Manage Itineraries**: View and manage your saved itineraries
5. **Book**: Book your preferred destinations

## Environment Variables Explained

- `MONGO_URI`: MongoDB connection string (local or Atlas)
- `JWT_SECRET`: Secret for signing JWT access tokens (use a strong random string)
- `JWT_REFRESH_SECRET`: Secret for signing refresh tokens (different from JWT_SECRET)
- `OPENAI_API_KEY`: Your OpenAI API key for AI itinerary generation
- `PORT`: Backend server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network connectivity for Atlas

### OpenAI API Errors
- Verify API key is correct
- Check API quota/billing at OpenAI dashboard
- Ensure you have sufficient credits

### Authentication Issues
- Clear localStorage and try logging in again
- Check if JWT_SECRET is set correctly
- Verify token hasn't expired

## License

Private - All rights reserved

## Support

For issues or questions, please contact the development team.
