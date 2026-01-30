"""
Ministry model and helper functions.
"""
from datetime import datetime
from bson import ObjectId
from app import db

class Ministry:
    """Ministry/Government department model."""
    
    @staticmethod
    def create(data):
        """Create a new ministry."""
        ministry_data = {
            'name_en': data['name_en'],
            'name_si': data.get('name_si', ''),
            'name_ta': data.get('name_ta', ''),
            'category': data['category'],  # List of categories this ministry handles
            'contact_email': data.get('contact_email'),
            'contact_phone': data.get('contact_phone'),
            'assigned_users': data.get('assigned_users', []),
            'performance_stats': {
                'total_issues': 0,
                'solved': 0,
                'pending': 0,
                'avg_response_time': 0
            },
            'created_at': datetime.utcnow()
        }
        
        result = db.ministries.insert_one(ministry_data)
        ministry_data['_id'] = result.inserted_id
        return ministry_data
    
    @staticmethod
    def find_by_id(ministry_id):
        """Find ministry by ID."""
        try:
            return db.ministries.find_one({'_id': ObjectId(ministry_id)})
        except:
            return None
    
    @staticmethod
    def find_by_category(category):
        """Find ministries that handle a specific category."""
        return list(db.ministries.find({'category': category}))
    
    @staticmethod
    def get_all(skip=0, limit=50):
        """Get all ministries."""
        cursor = db.ministries.find().skip(skip).limit(limit)
        return [Ministry.to_dict(ministry) for ministry in cursor]
    
    @staticmethod
    def update(ministry_id, data):
        """Update ministry data."""
        try:
            result = db.ministries.update_one(
                {'_id': ObjectId(ministry_id)},
                {'$set': data}
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def update_stats(ministry_id):
        """Update ministry performance statistics."""
        try:
            # Count issues tagged to this ministry
            total_issues = db.issues.count_documents({
                'tagged_ministries': ObjectId(ministry_id)
            })
            
            solved = db.issues.count_documents({
                'tagged_ministries': ObjectId(ministry_id),
                'status': 'solved'
            })
            
            pending = db.issues.count_documents({
                'tagged_ministries': ObjectId(ministry_id),
                'status': {'$in': ['pending', 'verified', 'in_progress']}
            })
            
            stats = {
                'performance_stats.total_issues': total_issues,
                'performance_stats.solved': solved,
                'performance_stats.pending': pending
            }
            
            db.ministries.update_one(
                {'_id': ObjectId(ministry_id)},
                {'$set': stats}
            )
            return True
        except:
            return False
    
    @staticmethod
    def delete(ministry_id):
        """Delete a ministry."""
        try:
            result = db.ministries.delete_one({'_id': ObjectId(ministry_id)})
            return result.deleted_count > 0
        except:
            return False
    
    @staticmethod
    def to_dict(ministry):
        """Convert ministry document to dictionary."""
        if not ministry:
            return None
        
        return {
            'id': str(ministry['_id']),
            'name_en': ministry['name_en'],
            'name_si': ministry.get('name_si', ''),
            'name_ta': ministry.get('name_ta', ''),
            'category': ministry['category'],
            'contact_email': ministry.get('contact_email'),
            'contact_phone': ministry.get('contact_phone'),
            'assigned_users': [str(u) for u in ministry.get('assigned_users', [])],
            'performance_stats': ministry.get('performance_stats', {}),
            'created_at': ministry['created_at'].isoformat()
        }
