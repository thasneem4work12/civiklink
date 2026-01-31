"""
Notification model and helper functions.
"""
from datetime import datetime
from bson import ObjectId
from app import db

class Notification:
    """Notification model for user alerts."""
    
    TYPES = [
        'issue_verified',
        'government_response',
        'ngo_claimed',
        'issue_solved',
        'issue_tagged',
        'comment_added',
        'status_updated'
    ]
    
    @staticmethod
    def create(user_id, notification_type, title, message, issue_id=None):
        """Create a new notification."""
        notification_data = {
            'user_id': ObjectId(user_id),
            'type': notification_type,
            'title': title,
            'message': message,
            'issue_id': ObjectId(issue_id) if issue_id else None,
            'read': False,
            'created_at': datetime.utcnow()
        }
        
        result = db.notifications.insert_one(notification_data)
        notification_data['_id'] = result.inserted_id
        return notification_data
    
    @staticmethod
    def get_user_notifications(user_id, skip=0, limit=20, unread_only=False):
        """Get user notifications."""
        try:
            query = {'user_id': ObjectId(user_id)}
            if unread_only:
                query['read'] = False
            
            cursor = db.notifications.find(query).sort('created_at', -1).skip(skip).limit(limit)
            return [Notification.to_dict(notif) for notif in cursor]
        except:
            return []
    
    @staticmethod
    def count_unread(user_id):
        """Count unread notifications for a user."""
        try:
            return db.notifications.count_documents({
                'user_id': ObjectId(user_id),
                'read': False
            })
        except:
            return 0
    
    @staticmethod
    def mark_as_read(notification_id):
        """Mark notification as read."""
        try:
            result = db.notifications.update_one(
                {'_id': ObjectId(notification_id)},
                {'$set': {'read': True}}
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def mark_all_as_read(user_id):
        """Mark all user notifications as read."""
        try:
            result = db.notifications.update_many(
                {'user_id': ObjectId(user_id), 'read': False},
                {'$set': {'read': True}}
            )
            return result.modified_count
        except:
            return 0
    
    @staticmethod
    def delete(notification_id):
        """Delete a notification."""
        try:
            result = db.notifications.delete_one({'_id': ObjectId(notification_id)})
            return result.deleted_count > 0
        except:
            return False
    
    @staticmethod
    def to_dict(notification):
        """Convert notification document to dictionary."""
        if not notification:
            return None
        
        return {
            'id': str(notification['_id']),
            'user_id': str(notification['user_id']),
            'type': notification['type'],
            'title': notification['title'],
            'message': notification['message'],
            'issue_id': str(notification['issue_id']) if notification.get('issue_id') else None,
            'read': notification.get('read', False),
            'created_at': notification['created_at'].isoformat()
        }
    
    @staticmethod
    def delete_all_read(user_id):
        """Delete all read notifications for a user."""
        try:
            result = db.notifications.delete_many({
                'user_id': ObjectId(user_id),
                'read': True
            })
            return result.deleted_count
        except:
            return 0
