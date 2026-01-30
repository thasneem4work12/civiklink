"""
Authentication and authorization decorators.
"""
from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from app.models.user import User

def role_required(allowed_roles):
    """
    Decorator to check if user has required role.
    Usage: @role_required(['admin', 'government'])
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            user_id = get_jwt_identity()
            user = User.find_by_id(user_id)
            
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            if user.get('status') != 'active':
                return jsonify({'error': 'Account is suspended'}), 403
            
            if user['role'] not in allowed_roles:
                return jsonify({'error': 'Unauthorized access'}), 403
            
            return fn(*args, **kwargs)
        
        return wrapper
    return decorator

def ownership_required(model_class, id_param='id'):
    """
    Decorator to check if user owns the resource.
    Usage: @ownership_required(Issue, 'issue_id')
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            user_id = get_jwt_identity()
            resource_id = kwargs.get(id_param)
            
            resource = model_class.find_by_id(resource_id)
            
            if not resource:
                return jsonify({'error': 'Resource not found'}), 404
            
            if str(resource.get('user_id')) != user_id:
                return jsonify({'error': 'Unauthorized access'}), 403
            
            return fn(*args, **kwargs)
        
        return wrapper
    return decorator
