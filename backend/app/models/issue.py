"""
Issue model and helper functions.
"""
from datetime import datetime
from bson import ObjectId
from app import db

class Issue:
    """Issue model for citizen-reported problems."""
    
    CATEGORIES = ['water', 'electricity', 'road', 'flood', 'waste', 'other']
    STATUSES = ['pending', 'verified', 'in_progress', 'solved', 'rejected']
    PRIORITIES = ['low', 'medium', 'high', 'critical']
    
    @staticmethod
    def create(data, user_id):
        """Create a new issue."""
        issue_data = {
            'user_id': ObjectId(user_id),
            'title': data['title'],
            'description': data['description'],
            'category': data['category'],
            'location': {
                'address': data['location']['address'],
                'district': data['location']['district'],
                'coordinates': data['location']['coordinates']  # [lat, lng]
            },
            'images': data.get('images', []),
            'tagged_ministries': data.get('tagged_ministries', []),
            'verification_count': 0,
            'verified_by': [],
            'status': 'pending',
            'priority': data.get('priority', 'medium'),
            'is_crisis': False,
            'government_response': None,
            'ngo_claim': None,
            'solution_verified': False,
            'verified_at': None,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        result = db.issues.insert_one(issue_data)
        issue_data['_id'] = result.inserted_id
        return issue_data
    
    @staticmethod
    def find_by_id(issue_id):
        """Find issue by ID."""
        try:
            return db.issues.find_one({'_id': ObjectId(issue_id)})
        except:
            return None
    
    @staticmethod
    def get_all(filters=None, skip=0, limit=20, sort_by='created_at', sort_order=-1):
        """Get all issues with optional filters."""
        query = filters or {}
        cursor = db.issues.find(query).sort(sort_by, sort_order).skip(skip).limit(limit)
        return [Issue.to_dict(issue) for issue in cursor]
    
    @staticmethod
    def count(filters=None):
        """Count issues with optional filters."""
        query = filters or {}
        return db.issues.count_documents(query)
    
    @staticmethod
    def update(issue_id, data):
        """Update issue data."""
        try:
            data['updated_at'] = datetime.utcnow()
            result = db.issues.update_one(
                {'_id': ObjectId(issue_id)},
                {'$set': data}
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def add_verification(issue_id, user_id):
        """Add user verification to issue."""
        try:
            result = db.issues.update_one(
                {'_id': ObjectId(issue_id)},
                {
                    '$addToSet': {'verified_by': ObjectId(user_id)},
                    '$inc': {'verification_count': 1},
                    '$set': {'updated_at': datetime.utcnow()}
                }
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def remove_verification(issue_id, user_id):
        """Remove user verification from issue."""
        try:
            result = db.issues.update_one(
                {'_id': ObjectId(issue_id)},
                {
                    '$pull': {'verified_by': ObjectId(user_id)},
                    '$inc': {'verification_count': -1},
                    '$set': {'updated_at': datetime.utcnow()}
                }
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def add_government_response(issue_id, ministry_id, message, action_taken):
        """Add government response to issue."""
        response_data = {
            'ministry_id': ObjectId(ministry_id),
            'message': message,
            'action_taken': action_taken,
            'responded_at': datetime.utcnow()
        }
        
        try:
            result = db.issues.update_one(
                {'_id': ObjectId(issue_id)},
                {
                    '$set': {
                        'government_response': response_data,
                        'status': 'in_progress',
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def add_ngo_claim(issue_id, ngo_id, action_plan):
        """Add NGO claim to issue."""
        claim_data = {
            'ngo_id': ObjectId(ngo_id),
            'claimed_at': datetime.utcnow(),
            'action_plan': action_plan,
            'status': 'claimed'
        }
        
        try:
            result = db.issues.update_one(
                {'_id': ObjectId(issue_id)},
                {
                    '$set': {
                        'ngo_claim': claim_data,
                        'status': 'in_progress',
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def delete(issue_id):
        """Delete an issue."""
        try:
            result = db.issues.delete_one({'_id': ObjectId(issue_id)})
            return result.deleted_count > 0
        except:
            return False
    
    @staticmethod
    def to_dict(issue):
        """Convert issue document to dictionary."""
        if not issue:
            return None
        
        return {
            'id': str(issue['_id']),
            'user_id': str(issue['user_id']),
            'title': issue['title'],
            'description': issue['description'],
            'category': issue['category'],
            'location': issue['location'],
            'images': issue.get('images', []),
            'tagged_ministries': [str(m) for m in issue.get('tagged_ministries', [])],
            'verification_count': issue.get('verification_count', 0),
            'verified_by': [str(u) for u in issue.get('verified_by', [])],
            'status': issue['status'],
            'priority': issue.get('priority', 'medium'),
            'is_crisis': issue.get('is_crisis', False),
            'government_response': issue.get('government_response'),
            'ngo_claim': issue.get('ngo_claim'),
            'solution_verified': issue.get('solution_verified', False),
            'verified_at': issue['verified_at'].isoformat() if issue.get('verified_at') else None,
            'created_at': issue['created_at'].isoformat(),
            'updated_at': issue['updated_at'].isoformat()
        }
    
    @staticmethod
    def search_nearby(lat, lng, radius_km=5, filters=None):
        """Search issues near a location."""
        query = filters or {}
        
        # Add geospatial query
        query['location.coordinates'] = {
            '$near': [float(lat), float(lng)],
            '$maxDistance': radius_km / 111.12  # Convert km to degrees (approximate)
        }
        
        cursor = db.issues.find(query).limit(50)
        return [Issue.to_dict(issue) for issue in cursor]
