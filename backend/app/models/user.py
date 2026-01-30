"""
User model and helper functions.
"""
from datetime import datetime
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

class User:
    """User model for all user types (Citizen, Government, NGO, Admin)."""
    
    ROLES = ['citizen', 'government', 'ngo', 'admin']
    
    @staticmethod
    def create(data):
        """Create a new user."""
        user_data = {
            'email': data['email'].lower(),
            'password': generate_password_hash(data['password']),
            'full_name': data['full_name'],
            'phone': data.get('phone'),
            'role': data.get('role', 'citizen'),
            'profile_pic': data.get('profile_pic'),
            'location': data.get('location', {}),
            'verified': False,
            'sl_udi': data.get('sl_udi'),
            'ministry_id': data.get('ministry_id'),
            'ngo_id': data.get('ngo_id'),
            'created_at': datetime.utcnow(),
            'last_login': None,
            'status': 'active'
        }
        
        result = db.users.insert_one(user_data)
        user_data['_id'] = result.inserted_id
        return user_data
    
    @staticmethod
    def find_by_email(email):
        """Find user by email."""
        return db.users.find_one({'email': email.lower()})
    
    @staticmethod
    def find_by_id(user_id):
        """Find user by ID."""
        try:
            return db.users.find_one({'_id': ObjectId(user_id)})
        except:
            return None
    
    @staticmethod
    def find_by_phone(phone):
        """Find user by phone."""
        return db.users.find_one({'phone': phone})
    
    @staticmethod
    def verify_password(stored_password, provided_password):
        """Verify user password."""
        return check_password_hash(stored_password, provided_password)
    
    @staticmethod
    def update(user_id, data):
        """Update user data."""
        try:
            result = db.users.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': data}
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def update_last_login(user_id):
        """Update user's last login timestamp."""
        try:
            db.users.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': {'last_login': datetime.utcnow()}}
            )
        except:
            pass
    
    @staticmethod
    def to_dict(user):
        """Convert user document to dictionary (without password)."""
        if not user:
            return None
        
        return {
            'id': str(user['_id']),
            'email': user['email'],
            'full_name': user['full_name'],
            'phone': user.get('phone'),
            'role': user['role'],
            'profile_pic': user.get('profile_pic'),
            'location': user.get('location', {}),
            'verified': user.get('verified', False),
            'ministry_id': str(user['ministry_id']) if user.get('ministry_id') else None,
            'ngo_id': str(user['ngo_id']) if user.get('ngo_id') else None,
            'created_at': user['created_at'].isoformat() if user.get('created_at') else None,
            'status': user.get('status', 'active')
        }
    
    @staticmethod
    def get_all(filters=None, skip=0, limit=20):
        """Get all users with optional filters."""
        query = filters or {}
        cursor = db.users.find(query).skip(skip).limit(limit)
        return [User.to_dict(user) for user in cursor]
    
    @staticmethod
    def count(filters=None):
        """Count users with optional filters."""
        query = filters or {}
        return db.users.count_documents(query)
