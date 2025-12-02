
# 🌍 Vagabond Inc. – Rediscover Paradise

**[Site →](https://vgbnd.vercel.app)**

Vagabond Inc. is a travel and booking platform where users can explore scenic camping destinations, register, log in, book experiences, and get a beautiful, responsive interface.

---

## 🚀 Features

- 🧳 Explore scenic destinations (like Alibaug, Lonavala, Pawna, etc.)
- 🔐 User login & registration (with validation + backend API)
- 📅 Booking form with age/date/ID validation
- 📬 Contact form storing data in MongoDB
- 📱 Mobile-first responsive layout
- 🎨 Clean modern UI with animations and icons

---

## ⚙️ Tech Stack

| Frontend     | Backend         | Database     | Others                        |
|--------------|------------------|--------------|-------------------------------|
| React (Vite) | Node.js + Express| MongoDB Atlas| React Router, CSS Modules     |
| React Icons  | JWT Auth         | MongoDB Compass | Animate.css, CountUp.js     |

---

## 🧑‍💻 Project Structure

```
vgbnd/
├── backend/                 # Express/Node.js backend (API server, models, routes)
├── public/                  # Static assets for frontend
├── src/                     # React app source code
├── README.md                # Project documentation
├── .gitignore               # Git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML template for frontend
├── package.json             # Project metadata and scripts
├── package-lock.json        # Lockfile for npm dependencies
├── vercel.json              # Vercel deployment settings
└── vite.config.js           # Vite.js build configuration
```
---

## 🧪 Getting Started (Local Development)

### 1. Clone the Repo

```bash
git clone https://github.com/omkarr10/vgbnd.git
cd vgbnd
```

### 2. Install Dependencies

**Frontend:**

```bash
cd vgbnd
npm install
```

**Backend:**

```bash
cd backend
npm install
```

### 3. Create `.env` in `/backend`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vgbnd
JWT_SECRET=your_secret_key
```

### 4. Run the Project

**Backend:**

```bash
cd backend
node server.js
```

**Frontend:**

```bash
cd vgbnd
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployment

| Service   | URL                              |
|-----------|----------------------------------|
| Frontend  | [Vercel](https://vgbnd.vercel.app) |
| Backend   | [Render](https://render.com/) |
| Database  | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |

---


**Made with ❤️ Vagabond Inc.**

