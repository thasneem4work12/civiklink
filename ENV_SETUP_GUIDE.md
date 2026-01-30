# 🔐 Environment Variables Setup Guide

## ✅ Development Configuration Complete

Your `.env` files have been created and configured with development defaults.

---

## 📁 Backend Configuration (backend/.env)

### ✅ Already Configured (Ready to Use)
- **FLASK_ENV**: `development`
- **PORT**: `5000`
- **SECRET_KEY**: Secure random key generated
- **JWT_SECRET**: Secure random key generated
- **MONGO_URI**: `mongodb://localhost:27017/civiklink`
- **CORS_ORIGINS**: Configured for local & Expo development

### ⚠️ Requires Real API Keys (Placeholders Set)

#### 1. Cloudinary (Image Uploads)
**Current**: Placeholder values
**How to get**:
1. Sign up at https://cloudinary.com/
2. Go to Dashboard
3. Copy: Cloud Name, API Key, API Secret
4. Update in `backend/.env`:
   ```
   CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
   CLOUDINARY_API_KEY=your_actual_api_key
   CLOUDINARY_API_SECRET=your_actual_api_secret
   ```

#### 2. Firebase Cloud Messaging (Push Notifications)
**Current**: Placeholder value
**How to get**:
1. Go to https://console.firebase.google.com/
2. Create/select project "civiklink-sl"
3. Project Settings → Cloud Messaging → Server Key
4. Update in `backend/.env`:
   ```
   FIREBASE_SERVER_KEY=your_actual_server_key
   ```

#### 3. Google Maps API (Geocoding - Optional)
**Current**: Placeholder value
**How to get**:
1. Go to https://console.cloud.google.com/
2. Enable Maps JavaScript API & Geocoding API
3. Create credentials → API Key
4. Update in `backend/.env`:
   ```
   GOOGLE_MAPS_API_KEY=your_actual_google_maps_key
   ```

---

## 📱 Frontend Configuration (frontend/.env)

### ✅ Already Configured
- **API_URL**: `http://localhost:5000/api` (local backend)

### ⚠️ Requires Real API Keys

#### 1. Google Maps API (For Map Display)
**Current**: Placeholder value
**How to get**: Same as backend Google Maps key
**Update in** `frontend/.env`:
```
GOOGLE_MAPS_API_KEY=your_actual_google_maps_key
```

#### 2. Firebase Configuration (For Push Notifications)
**Current**: Placeholder values
**How to get**:
1. Go to Firebase Console → Project Settings
2. Under "Your apps" → Add Web App (if not exists)
3. Copy the config values
4. Update in `frontend/.env`:
   ```
   FIREBASE_API_KEY=your_actual_api_key
   FIREBASE_PROJECT_ID=civiklink-sl
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   ```

---

## 🚦 Testing Without Real API Keys

You can still develop and test most features without the real API keys:

### ✅ Works Without Keys:
- User authentication (login/register)
- Issue posting (without images)
- Issue feed & filtering
- Government/NGO dashboards
- All API endpoints (except image upload & notifications)

### ❌ Requires Keys:
- Image uploads → Needs Cloudinary
- Push notifications → Needs Firebase
- Map display → Needs Google Maps API (can use OpenStreetMap as fallback)

---

## 🔧 MongoDB Setup

**Ensure MongoDB is running:**

### Windows:
```bash
mongod
```

### Mac/Linux:
```bash
sudo systemctl start mongod
```

### Or install MongoDB:
- Download: https://www.mongodb.com/try/download/community
- Install and start the service

---

## 🚀 Ready to Run!

### 1. Start Backend:
```bash
cd backend
D:/Projects/CivikLink/.venv/Scripts/python.exe run.py
```

### 2. Start Frontend:
```bash
cd frontend
npm start
```

### 3. Open Expo App on your phone and scan QR code

---

## 📝 Notes

- **Development Mode**: App will work with placeholder keys for basic features
- **Production**: MUST replace all placeholder keys before deploying
- **Security**: Never commit `.env` files to Git (already in .gitignore)
- **CORS**: If testing from different IP, add it to `CORS_ORIGINS` in backend/.env

---

## 🆘 Troubleshooting

### Backend won't start:
- Check MongoDB is running
- Verify port 5000 is not in use

### Frontend can't connect to backend:
- Check `API_URL` in `frontend/.env` matches backend URL
- If using physical device, use your computer's local IP instead of localhost

### Images won't upload:
- Update Cloudinary credentials in `backend/.env`

---

**Environment setup complete! 🎉 You're ready to start development.**
