# Environment Variables Configuration Guide

## Required Environment Variables

Your `.env` file must contain the following variables for the application to work properly.

## Creating Your .env File

1. Copy the example file:
```bash
cp .env.example .env
```

2. Open `.env` in your text editor

3. Fill in each variable as described below

---

## Variable Descriptions

### 1. MONGO_URI
**Description:** MongoDB connection string
**Required:** Yes
**Format:** `mongodb://localhost:27017/vgbnd` (local) or `mongodb+srv://...` (Atlas)

**Local MongoDB:**
```env
MONGO_URI=mongodb://localhost:27017/vgbnd
```

**MongoDB Atlas (Cloud):**
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/vgbnd?retryWrites=true&w=majority
```

**How to get it:**
- **Local:** Install MongoDB locally and use default connection
- **Atlas:** 
  1. Create free account at https://www.mongodb.com/cloud/atlas
  2. Create a cluster
  3. Click "Connect" → "Connect your application"
  4. Copy connection string
  5. Replace `<password>` with your database user password

---

### 2. JWT_SECRET
**Description:** Secret key for signing JWT access tokens
**Required:** Yes
**Security:** Must be at least 32 characters, random and unique

**Example:**
```env
JWT_SECRET=my-super-secret-jwt-key-32-chars-min-change-this-NOW
```

**How to generate a strong secret:**

**Option 1: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: PowerShell**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Option 3: Online Generator**
Visit: https://randomkeygen.com/ (use "CodeIgniter Encryption Keys")

⚠️ **IMPORTANT:** Never use default values in production!

---

### 3. JWT_REFRESH_SECRET
**Description:** Secret key for signing JWT refresh tokens
**Required:** Yes (falls back to JWT_SECRET if not provided)
**Security:** Must be different from JWT_SECRET, 32+ characters

**Example:**
```env
JWT_REFRESH_SECRET=another-different-secret-key-for-refresh-tokens-32-chars
```

**How to generate:**
Use the same methods as JWT_SECRET, but generate a DIFFERENT value.

---

### 4. OPENAI_API_KEY
**Description:** Your OpenAI API key for AI itinerary generation
**Required:** Yes (for AI features)
**Format:** `sk-...` (starts with sk-)

**Example:**
```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**How to get it:**
1. Visit https://platform.openai.com/
2. Sign up or log in
3. Go to https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Give it a name (e.g., "VGBND App")
6. Copy the key (you can only see it once!)
7. Paste into `.env`

**Pricing:**
- GPT-3.5-turbo: ~$0.002 per 1K tokens
- One itinerary: ~$0.02 - $0.05
- $5 credit should generate ~100-250 itineraries

**Free Credits:**
- New accounts get $5 free credit (expires after 3 months)
- Check balance at: https://platform.openai.com/account/usage

---

### 5. PORT
**Description:** Port number for backend server
**Required:** No (defaults to 5000)
**Format:** Number

**Example:**
```env
PORT=5000
```

**Note:** If you change this, update frontend API calls from `http://localhost:5000` to your new port.

---

### 6. NODE_ENV
**Description:** Environment mode
**Required:** No (defaults to development)
**Options:** `development` | `production` | `test`

**Example:**
```env
NODE_ENV=development
```

**Usage:**
- `development`: Verbose logging, detailed errors
- `production`: Minimal logging, generic errors
- `test`: For running tests

---

## Complete .env Example

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/vgbnd

# JWT Secrets (CHANGE THESE!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-32-chars-min
JWT_REFRESH_SECRET=your-refresh-token-secret-key-also-change-this-32-chars-min

# OpenAI API Key
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Server Configuration
PORT=5000
NODE_ENV=development
```

---

## Security Best Practices

### ✅ DO:
- ✅ Use strong, random secrets (32+ characters)
- ✅ Use different secrets for JWT_SECRET and JWT_REFRESH_SECRET
- ✅ Keep `.env` in `.gitignore` (already configured)
- ✅ Use environment-specific values (dev vs prod)
- ✅ Rotate secrets periodically in production
- ✅ Use MongoDB Atlas with strong passwords
- ✅ Monitor OpenAI API usage to avoid unexpected charges

### ❌ DON'T:
- ❌ Never commit `.env` to git
- ❌ Never share your secrets publicly
- ❌ Never use default/example values in production
- ❌ Never use simple/guessable secrets
- ❌ Never reuse secrets across projects
- ❌ Never share your OpenAI API key

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check connection string format
- For Atlas: Verify IP whitelist and credentials

### Issue: "Invalid token"
**Solution:**
- Check JWT_SECRET is set correctly
- Clear localStorage and login again
- Token might have expired (7 days)

### Issue: "OpenAI API error"
**Solution:**
- Verify API key starts with `sk-`
- Check API key is active at OpenAI dashboard
- Verify you have available credits
- Check for typos in the key

### Issue: "Missing required environment variables"
**Solution:**
- Ensure `.env` file exists in root directory
- Check all required variables are set
- Restart the server after changing `.env`

---

## Verifying Your Configuration

Run this quick test:

```bash
# Start backend
cd backend
node server.js
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

If you see errors, review your `.env` configuration.

---

## Production Deployment

When deploying to production:

1. **Generate new secrets:**
   ```bash
   # Generate new JWT_SECRET
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Generate new JWT_REFRESH_SECRET  
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Use MongoDB Atlas:**
   - Free tier available
   - Automatic backups
   - Better security

3. **Set environment variables on hosting platform:**
   - Heroku: Settings → Config Vars
   - Vercel: Settings → Environment Variables
   - Netlify: Site settings → Environment
   - AWS: Elastic Beanstalk → Configuration

4. **Change NODE_ENV:**
   ```env
   NODE_ENV=production
   ```

5. **Secure API keys:**
   - Use hosting platform's secret management
   - Never expose in client-side code
   - Rotate periodically

---

## Alternative: Using .env.local

For team development, you can use:
- `.env` - Shared defaults (commit to git)
- `.env.local` - Personal overrides (in .gitignore)

Example `.env`:
```env
PORT=5000
NODE_ENV=development
# Secrets left empty - each dev uses .env.local
JWT_SECRET=
JWT_REFRESH_SECRET=
OPENAI_API_KEY=
MONGO_URI=
```

Each developer creates `.env.local`:
```env
JWT_SECRET=my-personal-dev-secret
JWT_REFRESH_SECRET=my-personal-refresh-secret
OPENAI_API_KEY=sk-my-personal-key
MONGO_URI=mongodb://localhost:27017/vgbnd
```

---

## Environment Variable Loading

The app loads variables in this order:
1. `.env.local` (if exists) - highest priority
2. `.env` - default values
3. Process environment variables - lowest priority

This allows flexibility for different environments.

---

## Need Help?

- MongoDB Issues: https://docs.mongodb.com/
- OpenAI Issues: https://platform.openai.com/docs
- JWT Issues: https://jwt.io/introduction
- Environment Variables: https://nodejs.org/api/process.html#process_process_env

---

**Your `.env` file is ready when you see:**
✅ MongoDB Connected
✅ Server running on port 5000
✅ No error messages in console
