"""
NGO routes - Register, claim issues, update actions.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.models.issue import Issue
from app.models.ngo import NGO
from app.utils.decorators import role_required
from app.utils.validators import validate_required_fields
from app.services.notification_service import NotificationService

bp = Blueprint('ngo', __name__)

@bp.route('/register', methods=['POST'])
@jwt_required()
def register_ngo():
    """Register a new NGO."""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'contact_email', 'description']
    is_valid, message = validate_required_fields(data, required_fields)
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Add user as admin
    data['admin_users'] = [user_id]
    
    # Create NGO
    try:
        ngo = NGO.create(data)
        
        # Update user's ngo_id
        User.update(user_id, {'ngo_id': ngo['_id'], 'role': 'ngo'})
        
        return jsonify({
            'message': 'NGO registered successfully. Awaiting admin approval.',
            'ngo': NGO.to_dict(ngo)
        }), 201
    except Exception as e:
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500

@bp.route('/pending-approval', methods=['GET'])
@jwt_required()
@role_required(['ngo'])
def check_approval_status():
    """Check NGO approval status."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    
    if not user or not user.get('ngo_id'):
        return jsonify({'error': 'NGO not found'}), 404
    
    ngo = NGO.find_by_id(str(user['ngo_id']))
    
    if not ngo:
        return jsonify({'error': 'NGO not found'}), 404
    
    return jsonify({
        'ngo': NGO.to_dict(ngo),
        'approved': ngo.get('verified', False)
    }), 200

@bp.route('/dashboard', methods=['GET'])
@jwt_required()
@role_required(['ngo', 'admin'])
def get_dashboard():
    """Get NGO dashboard statistics."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    
    if not user or not user.get('ngo_id'):
        return jsonify({'error': 'NGO not assigned'}), 403
    
    ngo_id = str(user['ngo_id'])
    from bson import ObjectId
    
    # Get NGO
    ngo = NGO.find_by_id(ngo_id)
    
    # Get claimed issues count
    total_claimed = Issue.count({'ngo_claim.ngo_id': ObjectId(ngo_id)})
    active_claims = Issue.count({
        'ngo_claim.ngo_id': ObjectId(ngo_id),
        'status': 'in_progress'
    })
    completed = Issue.count({
        'ngo_claim.ngo_id': ObjectId(ngo_id),
        'status': 'solved',
        'solution_verified': True
    })
    
    return jsonify({
        'ngo': NGO.to_dict(ngo) if ngo else None,
        'stats': {
            'total_claimed': total_claimed,
            'active': active_claims,
            'completed': completed
        }
    }), 200

@bp.route('/available-issues', methods=['GET'])
@jwt_required()
@role_required(['ngo', 'admin'])
def get_available_issues():
    """Get issues available for NGO to claim."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    
    if not user or not user.get('ngo_id'):
        return jsonify({'error': 'NGO not assigned'}), 403
    
    ngo = NGO.find_by_id(str(user['ngo_id']))
    if not ngo or not ngo.get('verified'):
        return jsonify({'error': 'NGO not verified'}), 403
    
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    skip = (page - 1) * limit
    
    # Get issues that are not claimed and match NGO's areas of work
    filters = {
        'ngo_claim': None,
        'status': {'$in': ['verified', 'pending', 'in_progress']}
    }
    
    # Filter by NGO's areas of work
    if ngo.get('areas_of_work'):
        filters['category'] = {'$in': ngo['areas_of_work']}
    
    issues = Issue.get_all(filters, skip, limit)
    total = Issue.count(filters)
    
    return jsonify({
        'issues': issues,
        'pagination': {
            'page': page,
            'limit': limit,
            'total': total,
            'pages': (total + limit - 1) // limit
        }
    }), 200

@bp.route('/issues/<issue_id>/claim', methods=['POST'])
@jwt_required()
@role_required(['ngo', 'admin'])
def claim_issue(issue_id):
    """Claim an issue to solve."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    data = request.get_json()
    
    if not user or not user.get('ngo_id'):
        return jsonify({'error': 'NGO not assigned'}), 403
    
    ngo = NGO.find_by_id(str(user['ngo_id']))
    if not ngo or not ngo.get('verified'):
        return jsonify({'error': 'NGO not verified'}), 403
    
    # Validate action plan
    if not data.get('action_plan'):
        return jsonify({'error': 'Action plan is required'}), 400
    
    # Find issue
    issue = Issue.find_by_id(issue_id)
    if not issue:
        return jsonify({'error': 'Issue not found'}), 404
    
    # Check if already claimed
    if issue.get('ngo_claim'):
        return jsonify({'error': 'Issue already claimed by another NGO'}), 409
    
    ngo_id = str(user['ngo_id'])
    
    # Claim issue
    success = Issue.add_ngo_claim(
        issue_id,
        ngo_id,
        data['action_plan']
    )
    
    if success:
        # Notify issue owner
        NotificationService.notify_ngo_claimed(
            str(issue['user_id']),
            issue_id,
            ngo_id
        )
        
        # Update NGO stats
        NGO.update_stats(ngo_id)
        
        updated_issue = Issue.find_by_id(issue_id)
        return jsonify({
            'message': 'Issue claimed successfully',
            'issue': Issue.to_dict(updated_issue)
        }), 200
    else:
        return jsonify({'error': 'Claim failed'}), 500

@bp.route('/issues/<issue_id>/update-action', methods=['PUT'])
@jwt_required()
@role_required(['ngo', 'admin'])
def update_action(issue_id):
    """Update action taken on claimed issue."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    data = request.get_json()
    
    if not user or not user.get('ngo_id'):
        return jsonify({'error': 'NGO not assigned'}), 403
    
    # Find issue
    issue = Issue.find_by_id(issue_id)
    if not issue:
        return jsonify({'error': 'Issue not found'}), 404
    
    # Check if claimed by this NGO
    if not issue.get('ngo_claim') or str(issue['ngo_claim']['ngo_id']) != str(user['ngo_id']):
        return jsonify({'error': 'Issue not claimed by your NGO'}), 403
    
    # Update claim data
    update_data = {}
    if data.get('action_plan'):
        update_data['ngo_claim.action_plan'] = data['action_plan']
    if data.get('status'):
        update_data['ngo_claim.status'] = data['status']
    
    if not update_data:
        return jsonify({'error': 'No valid fields to update'}), 400
    
    success = Issue.update(issue_id, update_data)
    
    if success:
        updated_issue = Issue.find_by_id(issue_id)
        return jsonify({
            'message': 'Action updated successfully',
            'issue': Issue.to_dict(updated_issue)
        }), 200
    else:
        return jsonify({'error': 'Update failed'}), 500

@bp.route('/claimed-issues', methods=['GET'])
@jwt_required()
@role_required(['ngo', 'admin'])
def get_claimed_issues():
    """Get issues claimed by this NGO."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    
    if not user or not user.get('ngo_id'):
        return jsonify({'error': 'NGO not assigned'}), 403
    
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    skip = (page - 1) * limit
    
    from bson import ObjectId
    filters = {'ngo_claim.ngo_id': ObjectId(str(user['ngo_id']))}
    
    issues = Issue.get_all(filters, skip, limit)
    total = Issue.count(filters)
    
    return jsonify({
        'issues': issues,
        'pagination': {
            'page': page,
            'limit': limit,
            'total': total,
            'pages': (total + limit - 1) // limit
        }
    }), 200

@bp.route('/profile/<ngo_id>', methods=['GET'])
def get_ngo_profile(ngo_id):
    """Get public NGO profile."""
    ngo = NGO.find_by_id(ngo_id)
    
    if not ngo:
        return jsonify({'error': 'NGO not found'}), 404
    
    if not ngo.get('verified'):
        return jsonify({'error': 'NGO not verified'}), 403
    
    # Update stats before returning
    NGO.update_stats(ngo_id)
    ngo = NGO.find_by_id(ngo_id)
    
    return jsonify({'ngo': NGO.to_dict(ngo)}), 200
