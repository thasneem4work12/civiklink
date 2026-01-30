# 🇱🇰 CivikLink SL - Direct Accountability & Community Support Platform

A social-media-style platform for reporting utility and service delays in Sri Lanka, providing transparent public-facing dashboard for citizens to hold government officials accountable.

## 📋 Overview

CivikLink SL bridges the communication gap between high-level decision-makers and local citizens by creating a public record of service failures and resolutions.

### Key Features

- 📍 **Public Issue Reporting** - Citizens post utility issues with location and photos
- 🏛️ **Auto-Ministry Tagging** - System automatically tags relevant ministries
- ✅ **Community Verification** - Neighbors upvote/verify posts to prevent fake reports
- 👥 **NGO Integration** - NGOs can claim and solve issues
- 📊 **Performance Leaderboard** - Public ranking of ministries by resolution rate
- 🚨 **Crisis Mode** - Emergency heatmap during floods/disasters
- 🌐 **Multilingual** - Sinhala, Tamil, English support

## 🏗️ Tech Stack

### Backend
- **Framework**: Flask (Python 3.10+)
- **Database**: MongoDB
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **Notifications**: Firebase Cloud Messaging

### Frontend
- **Framework**: React Native (Expo)
- **State Management**: Redux Toolkit
- **Maps**: React Native Maps
- **UI Library**: React Native Paper

## 📁 Project Structure

```
civiklink-sl/
├── backend/                    # Flask REST API
│   ├── app/
│   │   ├── models/            # Database models
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Business logic
│   │   └── utils/             # Helper functions
│   ├── tests/                 # Backend tests
│   ├── requirements.txt
│   └── run.py
├── frontend/                   # React Native app
│   ├── src/
│   │   ├── screens/           # App pages
│   │   ├── components/        # Reusable components
│   │   ├── redux/             # State management
│   │   ├── services/          # API calls
│   │   └── locales/           # Translations
│   ├── package.json
│   └── App.js
└── docs/                       # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Edit .env with your configuration

# Run the server
python run.py
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# Edit .env with your API URL

# Start the app
npx expo start

# Press 'a' for Android, 'i' for iOS, 'w' for web
```

## 🔑 Environment Variables

### Backend (.env)
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key
MONGO_URI=mongodb://localhost:27017/civiklink
JWT_SECRET=your-jwt-secret
FIREBASE_SERVER_KEY=your-firebase-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-secret
```

### Frontend (.env)
```env
API_URL=http://localhost:5000/api
GOOGLE_MAPS_API_KEY=your-maps-key
FIREBASE_API_KEY=your-firebase-key
```

## 📱 User Roles

1. **Citizen** - Report issues, verify posts, close resolved issues
2. **Government** - Respond to tagged issues, update status
3. **NGO** - Claim issues, provide solutions, track actions
4. **Admin** - Moderate content, manage users, activate crisis mode

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 📚 API Documentation

See [docs/API.md](docs/API.md) for complete API documentation.

### Key Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/issues` - Get public issue feed
- `POST /api/issues` - Create new issue
- `POST /api/issues/:id/verify` - Verify issue
- `GET /api/leaderboard` - Get ministry performance

## 🗺️ Roadmap

- [x] Project setup
- [ ] User authentication
- [ ] Issue posting & feed
- [ ] Community verification
- [ ] Government dashboard
- [ ] NGO system
- [ ] Performance leaderboard
- [ ] Crisis mode
- [ ] Mobile apps (iOS/Android)
- [ ] SL-UDI integration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Development Team - CivikLink SL

## 📞 Support

For support, email support@civiklink.lk or join our Slack channel.

---

**Built with ❤️ for Sri Lanka 🇱🇰**
