# Testing Checklist

## ✅ Pre-Flight Checklist

### 1. Environment Setup
- [ ] `.env` file created with all required variables
- [ ] MongoDB running (local or Atlas)
- [ ] OpenAI API key added and valid
- [ ] Dependencies installed (`npm install`)

### 2. Backend Tests

#### Authentication Tests
```bash
# Test Registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","email":"test1@example.com","password":"password123"}'

# Expected: 201 status, returns token and user object

# Test Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"password123"}'

# Expected: 200 status, returns token, refreshToken, and user object

# Test Get Current User (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Expected: 200 status, returns user object without password
```

#### AI Itinerary Tests
```bash
# Test Generate Itinerary (requires valid token)
curl -X POST http://localhost:5000/api/itinerary/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "destination": "Lonavala",
    "duration": 2,
    "budget": "moderate",
    "interests": ["adventure", "nature"],
    "groupSize": "couple",
    "startDate": "2025-01-20"
  }'

# Expected: 200 status, returns generated itinerary and itineraryId

# Test Get My Itineraries
curl -X GET http://localhost:5000/api/itinerary/my-itineraries \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Expected: 200 status, returns array of itineraries
```

### 3. Frontend Tests

#### Manual Testing Steps

**Authentication Flow:**
1. [ ] Navigate to `/Login`
2. [ ] Click "Register" tab
3. [ ] Fill form: username, email, password (min 8 chars)
4. [ ] Check privacy policy checkbox
5. [ ] Click "Register"
6. [ ] Verify success message appears
7. [ ] Verify auto-redirect to `/explore`
8. [ ] Check if username appears in nav (if NavBar added to pages)
9. [ ] Refresh page - verify still logged in (token persistence)

**Login Flow:**
10. [ ] Logout (if NavBar added) or clear localStorage
11. [ ] Navigate to `/Login`
12. [ ] Fill username and password
13. [ ] Click "Log In"
14. [ ] Verify success message
15. [ ] Verify redirect to `/explore`

**Protected Route Test:**
16. [ ] Logout or clear localStorage
17. [ ] Try to access `/AIItinerary` directly
18. [ ] Verify redirect to `/Login`
19. [ ] Login successfully
20. [ ] Verify redirect to `/AIItinerary`

**AI Itinerary Generation:**
21. [ ] Ensure logged in
22. [ ] Navigate to `/AIItinerary`
23. [ ] Fill out form:
    - Destination: "Lonavala"
    - Duration: 3 days
    - Budget: Moderate
    - Select interests: adventure, nature, food
    - Group: Couple
    - Start date: Future date
24. [ ] Click "Generate AI Itinerary"
25. [ ] Verify loading state appears
26. [ ] Wait for generation (5-15 seconds)
27. [ ] Verify success toast appears
28. [ ] Verify itinerary displays with:
    - [ ] Overview
    - [ ] Total cost estimate
    - [ ] Day 1, 2, 3 sections
    - [ ] Activities with times
    - [ ] Meal recommendations
    - [ ] Tips
29. [ ] Click "Print / Save as PDF"
30. [ ] Verify print dialog opens

**Saved Itineraries:**
31. [ ] Click "My Saved Itineraries" button
32. [ ] Verify generated itinerary appears in list
33. [ ] Click "View" on saved itinerary
34. [ ] Verify itinerary displays correctly
35. [ ] Click "Delete" on saved itinerary
36. [ ] Verify delete confirmation/toast
37. [ ] Verify itinerary removed from list

### 4. Error Handling Tests

**Authentication Errors:**
- [ ] Try registering with existing email
- [ ] Try registering with invalid email format
- [ ] Try registering with password < 8 characters
- [ ] Try logging in with wrong password
- [ ] Try logging in with non-existent username

**Authorization Errors:**
- [ ] Try accessing protected route without token
- [ ] Try using expired token (manually modify expiry)
- [ ] Try using invalid token format

**AI Generation Errors:**
- [ ] Try generating without login (should redirect)
- [ ] Try submitting form with missing fields
- [ ] Test with invalid OpenAI API key (backend)
- [ ] Test with no OpenAI credits (backend)

### 5. Database Verification

**MongoDB Checks:**
```bash
# Connect to MongoDB
mongosh

# Switch to database
use vgbnd

# Check users collection
db.users.find().pretty()
# Verify: passwords are hashed, roles exist, no plain passwords

# Check itineraries collection
db.itineraries.find().pretty()
# Verify: userId references exist, itinerary data is complete

# Check indexes
db.users.getIndexes()
# Verify: unique indexes on email and username

# Count documents
db.users.countDocuments()
db.itineraries.countDocuments()
```

### 6. Security Checks

- [ ] Verify `.env` file is in `.gitignore`
- [ ] Verify passwords in database are hashed (not readable)
- [ ] Verify JWT secret is strong (32+ characters)
- [ ] Verify tokens expire (check expiry timestamps)
- [ ] Verify protected routes return 401 without token
- [ ] Verify CORS is properly configured
- [ ] Check for console errors in browser
- [ ] Check for security warnings in browser

### 7. Performance Tests

- [ ] AI itinerary generation completes in < 20 seconds
- [ ] Page loads are fast (< 2 seconds)
- [ ] No memory leaks on repeated navigation
- [ ] Multiple itinerary generations work consecutively
- [ ] Token refresh works seamlessly

### 8. Cross-Browser Testing

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if available)

### 9. Responsive Design

Test on different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### 10. Integration Tests

- [ ] Full user journey: Register → Login → Generate Itinerary → Save → Logout → Login → View Saved
- [ ] Multiple users can use system simultaneously
- [ ] Different users see only their own itineraries
- [ ] Admin role (if implemented) has additional access

---

## 🐛 Known Issues / Limitations

Document any issues found:
1. 
2. 
3. 

---

## 📝 Test Results

**Date:** _____________  
**Tester:** _____________  
**Overall Status:** [ ] Pass [ ] Fail [ ] Partial

**Notes:**
_____________________________________
_____________________________________
_____________________________________

---

## ✅ Ready for Production?

All critical tests passing:
- [ ] Authentication working
- [ ] AI generation working
- [ ] Database persistence working
- [ ] Security measures in place
- [ ] Error handling proper
- [ ] No critical bugs

**Production Checklist:**
- [ ] Change JWT secrets to strong random values
- [ ] Use production MongoDB (Atlas)
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up monitoring/logging
- [ ] Configure proper CORS origins
- [ ] Add backup strategy
- [ ] Document deployment process
