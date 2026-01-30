"""
Notification service - Create and send notifications to users.
"""
from app.models.notification import Notification
from app.models.user import User
from app.models.ministry import Ministry
from app.models.ngo import NGO

class NotificationService:
    """Service for managing notifications."""
    
    @staticmethod
    def create_notification(user_id, notification_type, title, message, issue_id=None):
        """Create a notification for a user."""
        return Notification.create(user_id, notification_type, title, message, issue_id)
    
    @staticmethod
    def notify_issue_verified(user_id, issue_id):
        """Notify user that their issue has been verified by community."""
        NotificationService.create_notification(
            user_id,
            'issue_verified',
            'Issue Verified',
            'Your issue has been verified by the community and is now visible to government officials.',
            issue_id
        )
    
    @staticmethod
    def notify_government_response(user_id, issue_id, ministry_id):
        """Notify user about government response to their issue."""
        ministry = Ministry.find_by_id(ministry_id)
        ministry_name = ministry['name_en'] if ministry else 'Government'
        
        NotificationService.create_notification(
            user_id,
            'government_response',
            'Government Response',
            f'{ministry_name} has responded to your issue.',
            issue_id
        )
    
    @staticmethod
    def notify_ngo_claimed(user_id, issue_id, ngo_id):
        """Notify user that an NGO has claimed their issue."""
        ngo = NGO.find_by_id(ngo_id)
        ngo_name = ngo['name'] if ngo else 'An NGO'
        
        NotificationService.create_notification(
            user_id,
            'ngo_claimed',
            'NGO Claimed Issue',
            f'{ngo_name} has claimed your issue and will work on resolving it.',
            issue_id
        )
    
    @staticmethod
    def notify_issue_solved(user_id, issue_id):
        """Notify user that their issue has been marked as solved."""
        NotificationService.create_notification(
            user_id,
            'issue_solved',
            'Issue Solved',
            'Your issue has been marked as solved. Please verify if the solution is satisfactory.',
            issue_id
        )
    
    @staticmethod
    def notify_ministry_tagged(ministry_id, issue_id):
        """Notify ministry users about a tagged issue."""
        ministry = Ministry.find_by_id(ministry_id)
        
        if not ministry:
            return
        
        # Notify all assigned users
        for user_id in ministry.get('assigned_users', []):
            NotificationService.create_notification(
                str(user_id),
                'issue_tagged',
                'New Issue Tagged',
                'A new issue has been tagged to your ministry.',
                issue_id
            )
    
    @staticmethod
    def notify_status_updated(user_id, issue_id, new_status):
        """Notify user about issue status update."""
        status_messages = {
            'pending': 'Your issue is pending review.',
            'verified': 'Your issue has been verified.',
            'in_progress': 'Your issue is being worked on.',
            'solved': 'Your issue has been marked as solved.',
            'rejected': 'Your issue has been rejected.'
        }
        
        message = status_messages.get(new_status, 'Your issue status has been updated.')
        
        NotificationService.create_notification(
            user_id,
            'status_updated',
            'Status Updated',
            message,
            issue_id
        )
    
    @staticmethod
    def send_push_notification(user_id, title, message):
        """
        Send push notification via Firebase Cloud Messaging.
        This is a placeholder - implement actual Firebase integration.
        """
        # TODO: Implement Firebase Cloud Messaging
        # 1. Get user's FCM token from database
        # 2. Send notification via Firebase Admin SDK
        pass
    
    @staticmethod
    def send_email_notification(user_id, subject, body):
        """
        Send email notification.
        This is a placeholder - implement actual email sending.
        """
        # TODO: Implement email sending
        # 1. Get user email
        # 2. Send via SMTP or service like SendGrid
        pass
    
    @staticmethod
    def send_sms_notification(user_id, message):
        """
        Send SMS notification.
        This is a placeholder - implement actual SMS sending.
        """
        # TODO: Implement SMS sending
        # 1. Get user phone number
        # 2. Send via SMS gateway (Dialog/Mobitel API)
        pass
