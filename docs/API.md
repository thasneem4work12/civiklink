# API Documentation - CivikLink SL

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.civiklink.lk/api
```

## Authentication

All authenticated endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "full_name": "John Doe",
  "phone": "0771234567",
  "role": "citizen"
}

Response 201:
{
  "message": "User registered successfully",
  "user": { ... },
  "access_token": "jwt_token",
  "refresh_token": "refresh_token"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response 200:
{
  "message": "Login successful",
  "user": { ... },
  "access_token": "jwt_token",
  "refresh_token": "refresh_token"
}
```

## Issues

### Get All Issues
```http
GET /issues?page=1&limit=20&category=water&district=Colombo&status=pending
Authorization: Bearer <token>

Response 200:
{
  "issues": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Create Issue
```http
POST /issues
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Water shortage in area",
  "description": "No water supply for 3 days",
  "category": "water",
  "location": {
    "address": "123 Main St, Colombo 01",
    "district": "Colombo",
    "coordinates": [6.9271, 79.8612]
  },
  "images": ["url1", "url2"]
}

Response 201:
{
  "message": "Issue created successfully",
  "issue": { ... }
}
```

### Get Issue Detail
```http
GET /issues/:id

Response 200:
{
  "issue": { ... }
}
```

### Verify Issue
```http
POST /issues/:id/verify
Authorization: Bearer <token>

Response 200:
{
  "message": "Verification added successfully",
  "issue": { ... }
}
```

### Close Issue
```http
POST /issues/:id/close
Authorization: Bearer <token>

Response 200:
{
  "message": "Issue closed successfully",
  "issue": { ... }
}
```

## Government

### Get Dashboard
```http
GET /government/dashboard
Authorization: Bearer <token>
Requires: government role

Response 200:
{
  "ministry": { ... },
  "stats": {
    "total_issues": 50,
    "pending": 10,
    "in_progress": 20,
    "solved": 20
  }
}
```

### Respond to Issue
```http
POST /government/issues/:id/respond
Authorization: Bearer <token>
Requires: government role
Content-Type: application/json

{
  "message": "We are working on this issue",
  "action_taken": "Assigned repair team"
}

Response 200:
{
  "message": "Response added successfully",
  "issue": { ... }
}
```

## NGO

### Register NGO
```http
POST /ngo/register
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Help Sri Lanka Foundation",
  "registration_number": "REG12345",
  "description": "NGO focused on community support",
  "contact_email": "info@helpsrilanka.org",
  "contact_phone": "0112345678",
  "areas_of_work": ["water", "education"]
}

Response 201:
{
  "message": "NGO registered successfully. Awaiting admin approval.",
  "ngo": { ... }
}
```

### Claim Issue
```http
POST /ngo/issues/:id/claim
Authorization: Bearer <token>
Requires: ngo role
Content-Type: application/json

{
  "action_plan": "We will provide water tanks"
}

Response 200:
{
  "message": "Issue claimed successfully",
  "issue": { ... }
}
```

## Public Endpoints (No Auth Required)

### Leaderboard
```http
GET /leaderboard

Response 200:
{
  "ministries": [ ... ],
  "ngos": [ ... ]
}
```

### Statistics
```http
GET /stats

Response 200:
{
  "total_issues": 1000,
  "solved_issues": 600,
  "active_users": 5000,
  "verified_ngos": 25,
  "resolution_rate": 60.0
}
```

### Categories
```http
GET /categories

Response 200:
{
  "categories": [
    {
      "id": "water",
      "name_en": "Water Supply",
      "name_si": "ජල සම්පාදනය",
      "name_ta": "நீர் வழங்கல்"
    },
    ...
  ]
}
```

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

Common status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error
