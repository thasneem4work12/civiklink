"""
NGO model and helper functions.
"""
from datetime import datetime
from bson import ObjectId
from app import db

class NGO:
    """NGO/Donor organization model."""
    
    @staticmethod
    def create(data):
        """Create a new NGO."""
        ngo_data = {
            'name': data['name'],
            'registration_number': data.get('registration_number'),
            'description': data.get('description'),
            'contact_email': data['contact_email'],
            'contact_phone': data.get('contact_phone'),
            'website': data.get('website'),
            'areas_of_work': data.get('areas_of_work', []),
            'admin_users': data.get('admin_users', []),
            'verified': False,
            'approved_by': None,
            'approved_at': None,
            'performance_stats': {
                'total_claimed': 0,
                'completed': 0,
                'success_rate': 0
            },
            'created_at': datetime.utcnow()
        }
        
        result = db.ngos.insert_one(ngo_data)
        ngo_data['_id'] = result.inserted_id
        return ngo_data
    
    @staticmethod
    def find_by_id(ngo_id):
        """Find NGO by ID."""
        try:
            return db.ngos.find_one({'_id': ObjectId(ngo_id)})
        except:
            return None
    
    @staticmethod
    def get_all(filters=None, skip=0, limit=20):
        """Get all NGOs with optional filters."""
        query = filters or {}
        cursor = db.ngos.find(query).skip(skip).limit(limit)
        return [NGO.to_dict(ngo) for ngo in cursor]
    
    @staticmethod
    def count(filters=None):
        """Count NGOs with optional filters."""
        query = filters or {}
        return db.ngos.count_documents(query)
    
    @staticmethod
    def update(ngo_id, data):
        """Update NGO data."""
        try:
            result = db.ngos.update_one(
                {'_id': ObjectId(ngo_id)},
                {'$set': data}
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def approve(ngo_id, admin_user_id):
        """Approve NGO registration."""
        try:
            result = db.ngos.update_one(
                {'_id': ObjectId(ngo_id)},
                {
                    '$set': {
                        'verified': True,
                        'approved_by': ObjectId(admin_user_id),
                        'approved_at': datetime.utcnow()
                    }
                }
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def update_stats(ngo_id):
        """Update NGO performance statistics."""
        try:
            # Count issues claimed by this NGO
            total_claimed = db.issues.count_documents({
                'ngo_claim.ngo_id': ObjectId(ngo_id)
            })
            
            completed = db.issues.count_documents({
                'ngo_claim.ngo_id': ObjectId(ngo_id),
                'status': 'solved',
                'solution_verified': True
            })
            
            success_rate = (completed / total_claimed * 100) if total_claimed > 0 else 0
            
            stats = {
                'performance_stats.total_claimed': total_claimed,
                'performance_stats.completed': completed,
                'performance_stats.success_rate': round(success_rate, 2)
            }
            
            db.ngos.update_one(
                {'_id': ObjectId(ngo_id)},
                {'$set': stats}
            )
            return True
        except:
            return False
    
    @staticmethod
    def delete(ngo_id):
        """Delete an NGO."""
        try:
            result = db.ngos.delete_one({'_id': ObjectId(ngo_id)})
            return result.deleted_count > 0
        except:
            return False
    
    @staticmethod
    def to_dict(ngo):
        """Convert NGO document to dictionary."""
        if not ngo:
            return None
        
        return {
            'id': str(ngo['_id']),
            'name': ngo['name'],
            'registration_number': ngo.get('registration_number'),
            'description': ngo.get('description'),
            'contact_email': ngo['contact_email'],
            'contact_phone': ngo.get('contact_phone'),
            'website': ngo.get('website'),
            'areas_of_work': ngo.get('areas_of_work', []),
            'admin_users': [str(u) for u in ngo.get('admin_users', [])],
            'verified': ngo.get('verified', False),
            'approved_by': str(ngo['approved_by']) if ngo.get('approved_by') else None,
            'approved_at': ngo['approved_at'].isoformat() if ngo.get('approved_at') else None,
            'performance_stats': ngo.get('performance_stats', {}),
            'created_at': ngo['created_at'].isoformat()
        }
