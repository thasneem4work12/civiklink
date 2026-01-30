# Setup Guide - CivikLink SL

## Prerequisites

Install the following software:
- **Node.js** (v18+): https://nodejs.org/
- **Python** (3.10+): https://www.python.org/
- **MongoDB**: https://www.mongodb.com/try/download/community
- **Git**: https://git-scm.com/
- **VS Code**: https://code.visualstudio.com/

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Mac/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables:**
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   - MongoDB connection string
   - JWT secret key
   - Cloudinary credentials
   - Firebase server key
   - etc.

6. **Start MongoDB:**
   ```bash
   mongod
   ```

7. **Run the backend server:**
   ```bash
   python run.py
   ```

   Server will start on `http://localhost:5000`

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` and add:
   - API_URL (backend URL)
   - Google Maps API key
   - Firebase configuration

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Run on different platforms:**
   - **Android**: Press `a` or run `npm run android`
   - **iOS**: Press `i` or run `npm run ios` (Mac only)
   - **Web**: Press `w` or run `npm run web`

## Running with Expo Go

1. Install Expo Go app on your phone:
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. Scan the QR code shown in terminal after running `npm start`

## Database Setup

### Seed Initial Data

Run these commands in MongoDB shell or MongoDB Compass:

```javascript
// Create initial ministries
db.ministries.insertMany([
  {
    name_en: "Ministry of Power and Energy",
    name_si: "බලශක්ති අමාත්‍යාංශය",
    name_ta: "மின்சாரம் மற்றும் ஆற்றல் அமைச்சு",
    category: ["electricity"],
    contact_email: "info@power.gov.lk",
    performance_stats: { total_issues: 0, solved: 0, pending: 0, avg_response_time: 0 },
    created_at: new Date()
  },
  {
    name_en: "Ministry of Water Supply",
    name_si: "ජල සම්පාදන අමාත්‍යාංශය",
    name_ta: "நீர் வழங்கல் அமைச்சு",
    category: ["water"],
    contact_email: "info@water.gov.lk",
    performance_stats: { total_issues: 0, solved: 0, pending: 0, avg_response_time: 0 },
    created_at: new Date()
  },
  {
    name_en: "Ministry of Highways",
    name_si: "මහාමාර්ග අමාத்‍යාංශය",
    name_ta: "நெடுஞ்சாலைகள் அமைச்சு",
    category: ["road"],
    contact_email: "info@highways.gov.lk",
    performance_stats: { total_issues: 0, solved: 0, pending: 0, avg_response_time: 0 },
    created_at: new Date()
  }
]);
```

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod`
- Check connection string in `.env`
- Ensure MongoDB port (27017) is not blocked

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Expo will automatically use next available port

### Module Not Found
- Run `pip install -r requirements.txt` (backend)
- Run `npm install` (frontend)

### CORS Errors
- Check `CORS_ORIGINS` in backend `.env`
- Ensure frontend URL is included in CORS_ORIGINS

## Development Workflow

1. Start MongoDB
2. Start backend server
3. Start frontend server
4. Make changes and test
5. Commit to Git:
   ```bash
   git add .
   git commit -m "Your message"
   git push
   ```

## VS Code Extensions (Recommended)

- Python
- Pylance
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier
- GitLens
- MongoDB for VS Code

## Next Steps

1. Configure third-party services:
   - Cloudinary for image uploads
   - Firebase for push notifications
   - Google Maps API for maps
   - SMS gateway for notifications

2. Implement remaining features:
   - Issue detail screen
   - My issues screen
   - Government dashboard
   - NGO dashboard
   - Admin panel
   - Notifications
   - Crisis mode

3. Deploy to production:
   - Backend: AWS, Google Cloud, or Heroku
   - Frontend: Expo EAS Build
   - Database: MongoDB Atlas

## Support

For issues or questions:
- Email: support@civiklink.lk
- GitHub Issues: [Project Repository]
- Documentation: See `/docs` folder

---

**Happy Coding! 🚀**
