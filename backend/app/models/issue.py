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
        # Convert coordinates to GeoJSON Point format
        coordinates = data['location']['coordinates']
        # Ensure order is [longitude, latitude] for GeoJSON
        if len(coordinates) == 2:
            # If input is [lat, lng], swap to [lng, lat] for GeoJSON
            if coordinates[0] < 90 and coordinates[0] > -90:  # First value looks like latitude
                coordinates = [coordinates[1], coordinates[0]]
        
        issue_data = {
            'user_id': ObjectId(user_id),
            'title': data['title'],
            'description': data['description'],
            'category': data['category'],
            'address': data['location']['address'],
            'district': data['location']['district'],
            'location': {
                'type': 'Point',
                'coordinates': coordinates  # [lng, lat] for GeoJSON
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
        
        # Reconstruct location for API response
        location_response = {
            'address': issue.get('address', ''),
            'district': issue.get('district', ''),
            'coordinates': issue.get('location', {}).get('coordinates', [])
        }
        
        return {
            'id': str(issue['_id']),
            'user_id': str(issue['user_id']),
            'title': issue['title'],
            'description': issue['description'],
            'category': issue['category'],
            'location': location_response,
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
        
        # Add geospatial query using $nearSphere for GeoJSON
        query['location'] = {
            '$nearSphere': {
                '$geometry': {
                    'type': 'Point',
                    'coordinates': [float(lng), float(lat)]  # [lng, lat] for GeoJSON
                },
                '$maxDistance': radius_km * 1000  # Convert km to meters
            }
        }
        
        cursor = db.issues.find(query).limit(50)
        return [Issue.to_dict(issue) for issue in cursor]
    
    @staticmethod
    def get_by_user(user_id, skip=0, limit=20):
        """Get all issues reported by a specific user."""
        try:
            cursor = db.issues.find({'user_id': ObjectId(user_id)}) \
                .sort('created_at', -1).skip(skip).limit(limit)
            return [Issue.to_dict(issue) for issue in cursor]
        except:
            return []
    
    @staticmethod
    def get_by_ministry(ministry_id, skip=0, limit=20):
        """Get all issues tagged to a specific ministry."""
        try:
            cursor = db.issues.find({'tagged_ministries': ObjectId(ministry_id)}) \
                .sort('created_at', -1).skip(skip).limit(limit)
            return [Issue.to_dict(issue) for issue in cursor]
        except:
            return []
    
    @staticmethod
    def get_by_ngo(ngo_id, skip=0, limit=20):
        """Get all issues claimed by a specific NGO."""
        try:
            cursor = db.issues.find({'ngo_claim.ngo_id': ObjectId(ngo_id)}) \
                .sort('created_at', -1).skip(skip).limit(limit)
            return [Issue.to_dict(issue) for issue in cursor]
        except:
            return []
    
    @staticmethod
    def update_status(issue_id, status):
        """Update issue status."""
        if status not in Issue.STATUSES:
            return False
        
        try:
            update_data = {
                'status': status,
                'updated_at': datetime.utcnow()
            }
            
            # If status is verified, set verified_at timestamp
            if status == 'verified':
                update_data['verified_at'] = datetime.utcnow()
            
            result = db.issues.update_one(
                {'_id': ObjectId(issue_id)},
                {'$set': update_data}
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def verify_issue(issue_id, min_verifications=3):
        """Auto-verify issue if it reaches minimum verifications."""
        issue = Issue.find_by_id(issue_id)
        if not issue:
            return False
        
        if issue['verification_count'] >= min_verifications and issue['status'] == 'pending':
            return Issue.update_status(issue_id, 'verified')
        
        return False
    
    @staticmethod
    def set_crisis_mode(issue_id, is_crisis):
        """Mark issue as crisis/emergency."""
        try:
            result = db.issues.update_one(
                {'_id': ObjectId(issue_id)},
                {
                    '$set': {
                        'is_crisis': is_crisis,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def get_statistics(filters=None):
        """Get issue statistics."""
        query = filters or {}
        
        # Status breakdown
        status_pipeline = [
            {'$match': query},
            {
                '$group': {
                    '_id': '$status',
                    'count': {'$sum': 1}
                }
            }
        ]
        status_stats = list(db.issues.aggregate(status_pipeline))
        
        # Category breakdown
        category_pipeline = [
            {'$match': query},
            {
                '$group': {
                    '_id': '$category',
                    'count': {'$sum': 1}
                }
            }
        ]
        category_stats = list(db.issues.aggregate(category_pipeline))
        
        # Priority breakdown
        priority_pipeline = [
            {'$match': query},
            {
                '$group': {
                    '_id': '$priority',
                    'count': {'$sum': 1}
                }
            }
        ]
        priority_stats = list(db.issues.aggregate(priority_pipeline))
        
        return {
            'total': db.issues.count_documents(query),
            'by_status': {item['_id']: item['count'] for item in status_stats},
            'by_category': {item['_id']: item['count'] for item in category_stats},
            'by_priority': {item['_id']: item['count'] for item in priority_stats},
            'crisis_mode': db.issues.count_documents({**query, 'is_crisis': True}),
            'verified': db.issues.count_documents({**query, 'status': 'verified'}),
            'solved': db.issues.count_documents({**query, 'status': 'solved'})
        }
