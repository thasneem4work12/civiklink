# CivikLink SL - Copilot Instructions

## Project Overview
CivikLink SL is a civic accountability platform for Sri Lanka that enables citizens to report utility and service issues (water, electricity, roads, floods) and tag government officials for public accountability.

## Tech Stack
- **Backend**: Flask (Python), MongoDB, JWT Authentication
- **Frontend**: React Native (Cross-platform)
- **State Management**: Redux Toolkit
- **Maps**: React Native Maps + OpenStreetMap
- **Notifications**: Firebase Cloud Messaging
- **Image Storage**: Cloudinary

## Project Structure
- `backend/` - Flask REST API
- `frontend/` - React Native mobile app
- `docs/` - API and system documentation

## Key Features
- User authentication (Citizen, Government, NGO, Admin roles)
- Public issue feed with location and photos
- Auto-tagging ministries by category
- Community verification system
- Government response system
- NGO claiming and resolution
- Performance leaderboard
- Crisis/emergency heatmap mode
- Multilingual support (English, Sinhala, Tamil)

## Development Guidelines
- Follow REST API conventions
- Use JWT for authentication
- Implement role-based access control
- Write unit tests for critical features
- Use environment variables for secrets
- Follow PEP 8 for Python, ESLint for JavaScript
- Keep PRs focused and under 500 lines
