"""
Authentication routes - Login, Register, Profile management.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from app.models.user import User
from app.utils.validators import validate_email, validate_password, validate_required_fields
from app.services.notification_service import NotificationService

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['email', 'password', 'full_name']
    is_valid, message = validate_required_fields(data, required_fields)
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Validate email format
    if not validate_email(data['email']):
        return jsonify({'error': 'Invalid email format'}), 400
    
    # Validate password strength
    is_valid, message = validate_password(data['password'])
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Check if user already exists
    existing_user = User.find_by_email(data['email'])
    if existing_user:
        return jsonify({'error': 'Email already registered'}), 409
    
    # Check phone if provided
    if data.get('phone'):
        existing_phone = User.find_by_phone(data['phone'])
        if existing_phone:
            return jsonify({'error': 'Phone number already registered'}), 409
    
    # Create user
    try:
        user = User.create(data)
        user_dict = User.to_dict(user)
        
        # Create access tokens
        access_token = create_access_token(identity=str(user['_id']))
        refresh_token = create_refresh_token(identity=str(user['_id']))
        
        return jsonify({
            'message': 'User registered successfully',
            'user': user_dict,
            'access_token': access_token,
            'refresh_token': refresh_token
        }), 201
    except Exception as e:
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500

@bp.route('/login', methods=['POST'])
def login():
    """Login user."""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['email', 'password']
    is_valid, message = validate_required_fields(data, required_fields)
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Find user
    user = User.find_by_email(data['email'])
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Verify password
    if not User.verify_password(user['password'], data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Check if user is active
    if user.get('status') != 'active':
        return jsonify({'error': 'Account is suspended'}), 403
    
    # Update last login
    User.update_last_login(str(user['_id']))
    
    # Create access tokens
    access_token = create_access_token(identity=str(user['_id']))
    refresh_token = create_refresh_token(identity=str(user['_id']))
    
    user_dict = User.to_dict(user)
    
    return jsonify({
        'message': 'Login successful',
        'user': user_dict,
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 200

@bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'user': User.to_dict(user)}), 200

@bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile."""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Fields that can be updated
    allowed_fields = ['full_name', 'phone', 'profile_pic', 'location']
    update_data = {k: v for k, v in data.items() if k in allowed_fields}
    
    if not update_data:
        return jsonify({'error': 'No valid fields to update'}), 400
    
    # Update user
    success = User.update(user_id, update_data)
    
    if success:
        user = User.find_by_id(user_id)
        return jsonify({
            'message': 'Profile updated successfully',
            'user': User.to_dict(user)
        }), 200
    else:
        return jsonify({'error': 'Update failed'}), 500

@bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Change user password."""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    required_fields = ['current_password', 'new_password']
    is_valid, message = validate_required_fields(data, required_fields)
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Find user
    user = User.find_by_id(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Verify current password
    if not User.verify_password(user['password'], data['current_password']):
        return jsonify({'error': 'Current password is incorrect'}), 401
    
    # Validate new password
    is_valid, message = validate_password(data['new_password'])
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Update password
    from werkzeug.security import generate_password_hash
    new_password_hash = generate_password_hash(data['new_password'])
    success = User.update(user_id, {'password': new_password_hash})
    
    if success:
        return jsonify({'message': 'Password changed successfully'}), 200
    else:
        return jsonify({'error': 'Password change failed'}), 500

@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Logout user (client should discard tokens)."""
    return jsonify({'message': 'Logout successful'}), 200
