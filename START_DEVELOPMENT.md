# 🚀 Quick Start Development Guide

## Current Status: ✅ Ready to Develop

All code is written, dependencies are installed, and environment is configured!

---

## ⚠️ Before You Start - Install MongoDB

MongoDB is **NOT installed** on your system. You need it to run the backend.

### Option 1: Install MongoDB Community Edition (Recommended)
1. **Download**: https://www.mongodb.com/try/download/community
2. **Install**: Follow the installer (use default settings)
3. **Start**: MongoDB should auto-start, or run:
   ```bash
   mongod
   ```

### Option 2: Use MongoDB Atlas (Cloud - Free)
1. Create account: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster (M0)
3. Get connection string
4. Update `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/civiklink
   ```

---

## 🎯 Development Workflow

### First Time Setup (After Installing MongoDB):

1. **Seed the Database**:
   ```bash
   cd backend
   D:/Projects/CivikLink/.venv/Scripts/python.exe seed_db.py
   ```
   This creates initial ministries and indexes.

2. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   D:/Projects/CivikLink/.venv/Scripts/python.exe run.py
   ```
   Backend will run on `http://localhost:5000`

3. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```
   Expo will show a QR code - scan with Expo Go app

---

## 🛠️ Development Tasks You Can Start

### 1. **Test Basic Features** (Works Now!)
- ✅ User registration/login
- ✅ Post issues (without images - needs Cloudinary)
- ✅ View issue feed
- ✅ Search and filter issues

### 2. **Implement Missing Screens**
Current placeholders to build:
- `IssueDetailScreen.js` - Full issue view with map, images, comments
- `MyIssuesScreen.js` - User's reported issues list
- `GovDashboardScreen.js` - Government ministry dashboard
- `NGODashboardScreen.js` - NGO dashboard
- `AdminDashboardScreen.js` - Admin panel

### 3. **Add Third-Party Services** (When Ready)
Get API keys for:
- **Cloudinary** - Image uploads
- **Firebase** - Push notifications
- **Google Maps** - Map display

---

## 📁 Project Structure Reference

```
CivikLink/
├── backend/
│   ├── app/
│   │   ├── models/        # Database models
│   │   ├── routes/        # API endpoints (40+ routes ready)
│   │   ├── services/      # Business logic
│   │   └── utils/         # Validators, decorators
│   ├── run.py             # Backend entry point
│   └── seed_db.py         # Database seeding script
│
├── frontend/
│   ├── src/
│   │   ├── screens/       # React Native screens
│   │   ├── components/    # Reusable components
│   │   ├── redux/         # State management
│   │   ├── services/      # API calls
│   │   └── navigation/    # App navigation
│   └── App.js             # Frontend entry point
│
└── docs/
    ├── API.md             # Complete API documentation
    └── SETUP.md           # Detailed setup guide
```

---

## 🎓 What You Should Know

### Backend (Flask + MongoDB)
- **40+ API endpoints** already implemented
- **JWT authentication** configured
- **Role-based access** (citizen, government, ngo, admin)
- **Auto-tagging** system for ministries
- **Geospatial queries** for nearby issues

### Frontend (React Native)
- **Redux Toolkit** for state management
- **React Navigation** configured
- **Authentication flow** complete
- **Issue posting** form ready
- **Multilingual** (English, Sinhala, Tamil)

### API Documentation
See `docs/API.md` for all endpoints:
- Authentication: `/api/auth/*`
- Issues: `/api/issues/*`
- Government: `/api/government/*`
- NGO: `/api/ngo/*`
- Admin: `/api/admin/*`
- Public: `/api/public/*`

---

## 🐛 Common Development Issues

### Backend won't start?
- **MongoDB not running**: Start `mongod`
- **Port in use**: Change `PORT` in `backend/.env`
- **Import errors**: Ensure virtual env is activated

### Frontend can't connect?
- **Wrong API URL**: Check `frontend/.env` has `API_URL=http://localhost:5000/api`
- **CORS error**: Ensure backend `CORS_ORIGINS` includes your URL
- **On physical device**: Replace `localhost` with your computer's IP (e.g., `http://192.168.1.100:5000/api`)

### Images won't upload?
- **Cloudinary not configured**: Add real Cloudinary keys to `backend/.env`
- Until then, test without images

---

## 🧪 Testing

### Test Backend APIs:
```bash
# Using curl
curl http://localhost:5000/api/auth/register -X POST -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"Test123!\",\"full_name\":\"Test User\",\"role\":\"citizen\"}"

# Or use Postman/Insomnia
```

### Test Frontend:
```bash
cd frontend
npm test
```

---

## 📚 Next Steps Priority

1. **Install MongoDB** ← Do this first!
2. **Run seed_db.py** to populate initial data
3. **Start both servers** (backend + frontend)
4. **Test registration and login**
5. **Choose a feature to implement** from placeholders
6. **Get API keys** when you need image/notification features

---

## 🆘 Need Help?

- **API Docs**: See `docs/API.md`
- **Setup Guide**: See `docs/SETUP.md`
- **Environment Config**: See `ENV_SETUP_GUIDE.md`
- **Code Examples**: Check existing screens in `frontend/src/screens/`

---

**Everything is ready! Just install MongoDB and you're good to go! 🚀**
