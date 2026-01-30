"""
Government routes - Dashboard, respond to issues, view performance.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.models.issue import Issue
from app.models.ministry import Ministry
from app.utils.decorators import role_required
from app.services.notification_service import NotificationService

bp = Blueprint('government', __name__)

@bp.route('/dashboard', methods=['GET'])
@jwt_required()
@role_required(['government', 'admin'])
def get_dashboard():
    """Get government dashboard statistics."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    
    if not user or not user.get('ministry_id'):
        return jsonify({'error': 'Ministry not assigned'}), 403
    
    ministry_id = str(user['ministry_id'])
    from bson import ObjectId
    
    # Get ministry stats
    ministry = Ministry.find_by_id(ministry_id)
    
    # Get tagged issues count
    total_issues = Issue.count({'tagged_ministries': ObjectId(ministry_id)})
    pending_issues = Issue.count({
        'tagged_ministries': ObjectId(ministry_id),
        'status': {'$in': ['pending', 'verified']}
    })
    in_progress_issues = Issue.count({
        'tagged_ministries': ObjectId(ministry_id),
        'status': 'in_progress'
    })
    solved_issues = Issue.count({
        'tagged_ministries': ObjectId(ministry_id),
        'status': 'solved'
    })
    
    return jsonify({
        'ministry': Ministry.to_dict(ministry) if ministry else None,
        'stats': {
            'total_issues': total_issues,
            'pending': pending_issues,
            'in_progress': in_progress_issues,
            'solved': solved_issues
        }
    }), 200

@bp.route('/tagged-issues', methods=['GET'])
@jwt_required()
@role_required(['government', 'admin'])
def get_tagged_issues():
    """Get issues tagged to user's ministry."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    
    if not user or not user.get('ministry_id'):
        return jsonify({'error': 'Ministry not assigned'}), 403
    
    ministry_id = str(user['ministry_id'])
    
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    skip = (page - 1) * limit
    status = request.args.get('status')
    
    from bson import ObjectId
    filters = {'tagged_ministries': ObjectId(ministry_id)}
    
    if status:
        filters['status'] = status
    
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

@bp.route('/issues/<issue_id>/respond', methods=['POST'])
@jwt_required()
@role_required(['government', 'admin'])
def respond_to_issue(issue_id):
    """Government response to an issue."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    data = request.get_json()
    
    if not user or not user.get('ministry_id'):
        return jsonify({'error': 'Ministry not assigned'}), 403
    
    # Validate required fields
    if not data.get('message'):
        return jsonify({'error': 'Response message is required'}), 400
    
    # Find issue
    issue = Issue.find_by_id(issue_id)
    if not issue:
        return jsonify({'error': 'Issue not found'}), 404
    
    ministry_id = str(user['ministry_id'])
    from bson import ObjectId
    
    # Check if ministry is tagged
    if ObjectId(ministry_id) not in issue.get('tagged_ministries', []):
        return jsonify({'error': 'Issue not tagged to your ministry'}), 403
    
    # Add government response
    success = Issue.add_government_response(
        issue_id,
        ministry_id,
        data['message'],
        data.get('action_taken', '')
    )
    
    if success:
        # Notify issue owner
        NotificationService.notify_government_response(
            str(issue['user_id']),
            issue_id,
            ministry_id
        )
        
        # Update ministry stats
        Ministry.update_stats(ministry_id)
        
        updated_issue = Issue.find_by_id(issue_id)
        return jsonify({
            'message': 'Response added successfully',
            'issue': Issue.to_dict(updated_issue)
        }), 200
    else:
        return jsonify({'error': 'Response failed'}), 500

@bp.route('/issues/<issue_id>/status', methods=['PUT'])
@jwt_required()
@role_required(['government', 'admin'])
def update_issue_status(issue_id):
    """Update issue status."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    data = request.get_json()
    
    if not user or not user.get('ministry_id'):
        return jsonify({'error': 'Ministry not assigned'}), 403
    
    # Validate status
    if not data.get('status') or data['status'] not in Issue.STATUSES:
        return jsonify({'error': 'Invalid status'}), 400
    
    # Find issue
    issue = Issue.find_by_id(issue_id)
    if not issue:
        return jsonify({'error': 'Issue not found'}), 404
    
    ministry_id = str(user['ministry_id'])
    from bson import ObjectId
    
    # Check if ministry is tagged
    if ObjectId(ministry_id) not in issue.get('tagged_ministries', []):
        return jsonify({'error': 'Issue not tagged to your ministry'}), 403
    
    # Update status
    success = Issue.update(issue_id, {'status': data['status']})
    
    if success:
        # Notify issue owner
        NotificationService.notify_status_updated(
            str(issue['user_id']),
            issue_id,
            data['status']
        )
        
        updated_issue = Issue.find_by_id(issue_id)
        return jsonify({
            'message': 'Status updated successfully',
            'issue': Issue.to_dict(updated_issue)
        }), 200
    else:
        return jsonify({'error': 'Update failed'}), 500

@bp.route('/performance', methods=['GET'])
@jwt_required()
@role_required(['government', 'admin'])
def get_performance():
    """Get ministry performance metrics."""
    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)
    
    if not user or not user.get('ministry_id'):
        return jsonify({'error': 'Ministry not assigned'}), 403
    
    ministry_id = str(user['ministry_id'])
    ministry = Ministry.find_by_id(ministry_id)
    
    if not ministry:
        return jsonify({'error': 'Ministry not found'}), 404
    
    # Update stats before returning
    Ministry.update_stats(ministry_id)
    
    # Get updated ministry data
    ministry = Ministry.find_by_id(ministry_id)
    
    return jsonify({
        'ministry': Ministry.to_dict(ministry)
    }), 200
