"""
Admin routes - User management, issue moderation, NGO approval, crisis management.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.models.issue import Issue
from app.models.ministry import Ministry
from app.models.ngo import NGO
from app.utils.decorators import role_required
from app.utils.validators import validate_required_fields

bp = Blueprint('admin', __name__)

@bp.route('/dashboard', methods=['GET'])
@jwt_required()
@role_required(['admin'])
def get_dashboard():
    """Get admin dashboard statistics."""
    # User stats
    total_users = User.count()
    citizens = User.count({'role': 'citizen'})
    government_users = User.count({'role': 'government'})
    ngo_users = User.count({'role': 'ngo'})
    
    # Issue stats
    total_issues = Issue.count()
    pending_issues = Issue.count({'status': 'pending'})
    verified_issues = Issue.count({'status': 'verified'})
    in_progress_issues = Issue.count({'status': 'in_progress'})
    solved_issues = Issue.count({'status': 'solved'})
    
    # NGO stats
    total_ngos = NGO.count()
    pending_ngos = NGO.count({'verified': False})
    verified_ngos = NGO.count({'verified': True})
    
    # Ministry stats
    from app import db
    total_ministries = db.ministries.count_documents({})
    
    return jsonify({
        'users': {
            'total': total_users,
            'citizens': citizens,
            'government': government_users,
            'ngos': ngo_users
        },
        'issues': {
            'total': total_issues,
            'pending': pending_issues,
            'verified': verified_issues,
            'in_progress': in_progress_issues,
            'solved': solved_issues
        },
        'ngos': {
            'total': total_ngos,
            'pending': pending_ngos,
            'verified': verified_ngos
        },
        'ministries': {
            'total': total_ministries
        }
    }), 200

@bp.route('/users', methods=['GET'])
@jwt_required()
@role_required(['admin'])
def get_users():
    """Get all users."""
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    skip = (page - 1) * limit
    role = request.args.get('role')
    
    filters = {}
    if role:
        filters['role'] = role
    
    users = User.get_all(filters, skip, limit)
    total = User.count(filters)
    
    return jsonify({
        'users': users,
        'pagination': {
            'page': page,
            'limit': limit,
            'total': total,
            'pages': (total + limit - 1) // limit
        }
    }), 200

@bp.route('/users/<user_id>/status', methods=['PUT'])
@jwt_required()
@role_required(['admin'])
def update_user_status(user_id):
    """Update user status (suspend/activate)."""
    data = request.get_json()
    
    if not data.get('status') or data['status'] not in ['active', 'suspended']:
        return jsonify({'error': 'Invalid status'}), 400
    
    user = User.find_by_id(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    success = User.update(user_id, {'status': data['status']})
    
    if success:
        updated_user = User.find_by_id(user_id)
        return jsonify({
            'message': 'User status updated successfully',
            'user': User.to_dict(updated_user)
        }), 200
    else:
        return jsonify({'error': 'Update failed'}), 500

@bp.route('/issues/<issue_id>', methods=['DELETE'])
@jwt_required()
@role_required(['admin'])
def delete_issue(issue_id):
    """Delete an issue (moderation)."""
    issue = Issue.find_by_id(issue_id)
    if not issue:
        return jsonify({'error': 'Issue not found'}), 404
    
    success = Issue.delete(issue_id)
    
    if success:
        return jsonify({'message': 'Issue deleted successfully'}), 200
    else:
        return jsonify({'error': 'Delete failed'}), 500

@bp.route('/ngos/pending', methods=['GET'])
@jwt_required()
@role_required(['admin'])
def get_pending_ngos():
    """Get NGOs pending approval."""
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    skip = (page - 1) * limit
    
    filters = {'verified': False}
    
    ngos = NGO.get_all(filters, skip, limit)
    total = NGO.count(filters)
    
    return jsonify({
        'ngos': ngos,
        'pagination': {
            'page': page,
            'limit': limit,
            'total': total,
            'pages': (total + limit - 1) // limit
        }
    }), 200

@bp.route('/ngos/<ngo_id>/approve', methods=['POST'])
@jwt_required()
@role_required(['admin'])
def approve_ngo(ngo_id):
    """Approve NGO registration."""
    user_id = get_jwt_identity()
    
    ngo = NGO.find_by_id(ngo_id)
    if not ngo:
        return jsonify({'error': 'NGO not found'}), 404
    
    if ngo.get('verified'):
        return jsonify({'error': 'NGO already approved'}), 409
    
    success = NGO.approve(ngo_id, user_id)
    
    if success:
        # Notify NGO admin users
        from app.services.notification_service import NotificationService
        for admin_user_id in ngo.get('admin_users', []):
            NotificationService.create_notification(
                str(admin_user_id),
                'ngo_approved',
                'NGO Approved',
                'Your NGO registration has been approved!'
            )
        
        updated_ngo = NGO.find_by_id(ngo_id)
        return jsonify({
            'message': 'NGO approved successfully',
            'ngo': NGO.to_dict(updated_ngo)
        }), 200
    else:
        return jsonify({'error': 'Approval failed'}), 500

@bp.route('/ngos/<ngo_id>', methods=['DELETE'])
@jwt_required()
@role_required(['admin'])
def delete_ngo(ngo_id):
    """Delete/reject NGO."""
    ngo = NGO.find_by_id(ngo_id)
    if not ngo:
        return jsonify({'error': 'NGO not found'}), 404
    
    success = NGO.delete(ngo_id)
    
    if success:
        return jsonify({'message': 'NGO deleted successfully'}), 200
    else:
        return jsonify({'error': 'Delete failed'}), 500

@bp.route('/ministries', methods=['GET'])
@jwt_required()
@role_required(['admin'])
def get_ministries():
    """Get all ministries."""
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 50))
    skip = (page - 1) * limit
    
    ministries = Ministry.get_all(skip, limit)
    
    return jsonify({'ministries': ministries}), 200

@bp.route('/ministries', methods=['POST'])
@jwt_required()
@role_required(['admin'])
def create_ministry():
    """Create a new ministry."""
    data = request.get_json()
    
    required_fields = ['name_en', 'category']
    is_valid, message = validate_required_fields(data, required_fields)
    if not is_valid:
        return jsonify({'error': message}), 400
    
    try:
        ministry = Ministry.create(data)
        return jsonify({
            'message': 'Ministry created successfully',
            'ministry': Ministry.to_dict(ministry)
        }), 201
    except Exception as e:
        return jsonify({'error': f'Creation failed: {str(e)}'}), 500

@bp.route('/ministries/<ministry_id>', methods=['PUT'])
@jwt_required()
@role_required(['admin'])
def update_ministry(ministry_id):
    """Update ministry details."""
    data = request.get_json()
    
    ministry = Ministry.find_by_id(ministry_id)
    if not ministry:
        return jsonify({'error': 'Ministry not found'}), 404
    
    allowed_fields = ['name_en', 'name_si', 'name_ta', 'category', 'contact_email', 'contact_phone']
    update_data = {k: v for k, v in data.items() if k in allowed_fields}
    
    if not update_data:
        return jsonify({'error': 'No valid fields to update'}), 400
    
    success = Ministry.update(ministry_id, update_data)
    
    if success:
        updated_ministry = Ministry.find_by_id(ministry_id)
        return jsonify({
            'message': 'Ministry updated successfully',
            'ministry': Ministry.to_dict(updated_ministry)
        }), 200
    else:
        return jsonify({'error': 'Update failed'}), 500

@bp.route('/ministries/<ministry_id>', methods=['DELETE'])
@jwt_required()
@role_required(['admin'])
def delete_ministry(ministry_id):
    """Delete a ministry."""
    ministry = Ministry.find_by_id(ministry_id)
    if not ministry:
        return jsonify({'error': 'Ministry not found'}), 404
    
    success = Ministry.delete(ministry_id)
    
    if success:
        return jsonify({'message': 'Ministry deleted successfully'}), 200
    else:
        return jsonify({'error': 'Delete failed'}), 500

@bp.route('/crisis/activate', methods=['POST'])
@jwt_required()
@role_required(['admin'])
def activate_crisis_mode():
    """Activate crisis mode for specific districts."""
    data = request.get_json()
    
    required_fields = ['affected_districts', 'type']
    is_valid, message = validate_required_fields(data, required_fields)
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Mark issues in affected districts as crisis
    from app import db
    result = db.issues.update_many(
        {
            'location.district': {'$in': data['affected_districts']},
            'status': {'$in': ['pending', 'verified', 'in_progress']}
        },
        {'$set': {'is_crisis': True, 'priority': 'critical'}}
    )
    
    return jsonify({
        'message': 'Crisis mode activated',
        'affected_issues': result.modified_count,
        'districts': data['affected_districts']
    }), 200

@bp.route('/analytics', methods=['GET'])
@jwt_required()
@role_required(['admin'])
def get_analytics():
    """Get system analytics and reports."""
    from app import db
    
    # Issue distribution by category
    category_stats = list(db.issues.aggregate([
        {'$group': {'_id': '$category', 'count': {'$sum': 1}}}
    ]))
    
    # Issue distribution by district
    district_stats = list(db.issues.aggregate([
        {'$group': {'_id': '$location.district', 'count': {'$sum': 1}}}
    ]))
    
    # Issue status distribution
    status_stats = list(db.issues.aggregate([
        {'$group': {'_id': '$status', 'count': {'$sum': 1}}}
    ]))
    
    return jsonify({
        'by_category': category_stats,
        'by_district': district_stats,
        'by_status': status_stats
    }), 200
