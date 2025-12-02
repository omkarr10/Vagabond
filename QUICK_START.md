## Quick Start Guide - AI Itinerary & JWT Auth

### Step 1: Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
# Required Variables
MONGO_URI=mongodb://localhost:27017/vgbnd
JWT_SECRET=your-secret-key-here-minimum-32-characters-long
JWT_REFRESH_SECRET=your-refresh-secret-key-here-also-32-chars
OPENAI_API_KEY=sk-your-openai-api-key-here
PORT=5000
```

**Get your OpenAI API Key:**
1. Visit https://platform.openai.com/
2. Sign up or log in
3. Go to API Keys section
4. Create a new secret key
5. Copy and paste it into `.env`

### Step 2: Start the Application

```bash
# Install dependencies (if not done)
npm install

# Start MongoDB (if local)
mongod

# Start the backend server
cd backend
node server.js

# In another terminal, start the frontend
npm run start-vite
```

### Step 3: Using the Features

#### JWT Authentication:

1. **Register a New Account:**
   - Go to `/Login`
   - Click "Register" tab
   - Fill in username, email, password
   - Accept privacy policy
   - Click "Register"
   - You'll be auto-logged in

2. **Login:**
   - Go to `/Login`
   - Enter username and password
   - Click "Log In"
   - Token is saved automatically

3. **Protected Routes:**
   - AI Itinerary page requires authentication
   - You'll be redirected to login if not authenticated

#### AI Itinerary Generator:

1. **Generate Itinerary:**
   - Login first (required)
   - Navigate to "AI Planner" or `/AIItinerary`
   - Fill in the form:
     - Destination (e.g., "Lonavala")
     - Duration (1-30 days)
     - Budget (budget/moderate/luxury)
     - Select interests (click multiple)
     - Group size (solo/couple/family/group)
     - Start date
   - Click "Generate AI Itinerary"
   - Wait 5-10 seconds for AI to generate

2. **View Generated Itinerary:**
   - Day-by-day schedule appears below
   - Activities with times and costs
   - Restaurant recommendations
   - Travel tips
   - Packing list
   - Important notes

3. **Save & Manage:**
   - Itinerary is auto-saved to your account
   - Click "My Saved Itineraries" to view all
   - Delete unwanted itineraries
   - Print or save as PDF

### API Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**Generate Itinerary (with token):**
```bash
curl -X POST http://localhost:5000/api/itinerary/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "destination":"Lonavala",
    "duration":3,
    "budget":"moderate",
    "interests":["adventure","nature"],
    "groupSize":"couple",
    "startDate":"2025-01-15"
  }'
```

### Troubleshooting

**"No token, authorization denied"**
- Make sure you're logged in
- Check if token is in localStorage
- Token might have expired (7 days), login again

**"Failed to generate itinerary"**
- Check OpenAI API key is correct
- Verify you have OpenAI credits
- Check backend console for detailed errors

**"User already exists"**
- Email is already registered
- Try logging in instead
- Use a different email

**MongoDB connection failed**
- Start MongoDB: `mongod`
- Check connection string in `.env`
- For Atlas, check network access settings

### Token Lifecycle

- **Access Token:** 7 days expiration
- **Refresh Token:** 30 days expiration
- Tokens stored in localStorage
- Auto-refresh attempted if access token expires
- Manual login required after refresh token expires

### Security Best Practices

1. Never commit `.env` file to git
2. Use strong, unique JWT secrets
3. Change default secrets in production
4. Keep OpenAI API key private
5. Use HTTPS in production
6. Implement rate limiting for API calls

### Next Steps

- Add user profile page
- Implement itinerary sharing
- Add export to PDF functionality
- Create admin dashboard
- Add email notifications
- Integrate payment gateway for bookings
