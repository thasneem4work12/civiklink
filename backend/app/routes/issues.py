"""
Issue routes - Create, read, update, verify issues.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.issue import Issue
from app.models.user import User
from app.utils.validators import validate_required_fields
from app.services.tagging_service import TaggingService
from app.services.notification_service import NotificationService

bp = Blueprint('issues', __name__)

@bp.route('', methods=['POST'])
@jwt_required()
def create_issue():
    """Create a new issue."""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['title', 'description', 'category', 'location']
    is_valid, message = validate_required_fields(data, required_fields)
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Validate location fields
    location_fields = ['address', 'district', 'coordinates']
    is_valid, message = validate_required_fields(data['location'], location_fields)
    if not is_valid:
        return jsonify({'error': f'Location {message}'}), 400
    
    # Auto-tag ministries based on category
    tagged_ministries = TaggingService.tag_ministries_by_category(data['category'])
    data['tagged_ministries'] = tagged_ministries
    
    # Create issue
    try:
        issue = Issue.create(data, user_id)
        issue_dict = Issue.to_dict(issue)
        
        # Notify tagged ministries
        for ministry_id in tagged_ministries:
            NotificationService.notify_ministry_tagged(ministry_id, str(issue['_id']))
        
        return jsonify({
            'message': 'Issue created successfully',
            'issue': issue_dict
        }), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create issue: {str(e)}'}), 500

@bp.route('', methods=['GET'])
def get_issues():
    """Get all issues (public feed)."""
    # Query parameters
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    skip = (page - 1) * limit
    
    category = request.args.get('category')
    district = request.args.get('district')
    status = request.args.get('status')
    priority = request.args.get('priority')
    is_crisis = request.args.get('is_crisis')
    
    # Build filters
    filters = {}
    if category:
        filters['category'] = category
    if district:
        filters['location.district'] = district
    if status:
        filters['status'] = status
    if priority:
        filters['priority'] = priority
    if is_crisis:
        filters['is_crisis'] = is_crisis.lower() == 'true'
    
    # Nearby search
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    radius = request.args.get('radius', 5)
    
    if lat and lng:
        issues = Issue.search_nearby(lat, lng, float(radius), filters)
        total = len(issues)
    else:
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

@bp.route('/<issue_id>', methods=['GET'])
def get_issue(issue_id):
    """Get issue details."""
    issue = Issue.find_by_id(issue_id)
    
    if not issue:
        return jsonify({'error': 'Issue not found'}), 404
    
    issue_dict = Issue.to_dict(issue)
    
    # Get user details
    user = User.find_by_id(issue_dict['user_id'])
    if user:
        issue_dict['user'] = {
            'id': str(user['_id']),
            'full_name': user['full_name'],
            'profile_pic': user.get('profile_pic')
        }
    
    return jsonify({'issue': issue_dict}), 200

@bp.route('/<issue_id>', methods=['PUT'])
@jwt_required()
def update_issue(issue_id):
    """Update issue (only by owner)."""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Find issue
    issue = Issue.find_by_id(issue_id)
    if not issue:
        return jsonify({'error': 'Issue not found'}), 404
    
    # Check ownership
    if str(issue['user_id']) != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Fields that can be updated
    allowed_fields = ['title', 'description', 'images']
    update_data = {k: v for k, v in data.items() if k in allowed_fields}
    
    if not update_data:
        return jsonify({'error': 'No valid fields to update'}), 400
    
    # Update issue
    success = Issue.update(issue_id, update_data)
    
    if success:
        updated_issue = Issue.find_by_id(issue_id)
        return jsonify({
            'message': 'Issue updated successfully',
            'issue': Issue.to_dict(updated_issue)
        }), 200
    else:
        return jsonify({'error': 'Update failed'}), 500

@bp.route('/<issue_id>', methods=['DELETE'])
@jwt_required()
def delete_issue(issue_id):
    """Delete issue (only by owner)."""
    user_id = get_jwt_identity()
    
    # Find issue
    issue = Issue.find_by_id(issue_id)
    if not issue:
        return jsonify({'error': 'Issue not found'}), 404
    
    # Check ownership
    if str(issue['user_id']) != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Delete issue
    success = Issue.delete(issue_id)
    
    if success:
        return jsonify({'message': 'Issue deleted successfully'}), 200
    else:
        return jsonify({'error': 'Delete failed'}), 500

@bp.route('/<issue_id>/verify', methods=['POST'])
@jwt_required()
def verify_issue(issue_id):
    """Verify/upvote an issue (community verification)."""
    user_id = get_jwt_identity()
    
    # Find issue
    issue = Issue.find_by_id(issue_id)
    if not issue:
        return jsonify({'error': 'Issue not found'}), 404
    
    # Check if already verified by this user
    from bson import ObjectId
    if ObjectId(user_id) in issue.get('verified_by', []):
        # Remove verification
        success = Issue.remove_verification(issue_id, user_id)
        action = 'removed'
    else:
        # Add verification
        success = Issue.add_verification(issue_id, user_id)
        action = 'added'
        
        # Check if issue should be marked as verified
        updated_issue = Issue.find_by_id(issue_id)
        if updated_issue['verification_count'] >= 3 and updated_issue['status'] == 'pending':
            Issue.update(issue_id, {'status': 'verified'})
            
            # Notify issue owner
            NotificationService.notify_issue_verified(
                str(issue['user_id']),
                issue_id
            )
    
    if success:
        updated_issue = Issue.find_by_id(issue_id)
        return jsonify({
            'message': f'Verification {action} successfully',
            'issue': Issue.to_dict(updated_issue)
        }), 200
    else:
        return jsonify({'error': 'Verification failed'}), 500

@bp.route('/<issue_id>/close', methods=['POST'])
@jwt_required()
def close_issue(issue_id):
    """Close/mark issue as solved (only by owner)."""
    user_id = get_jwt_identity()
    
    # Find issue
    issue = Issue.find_by_id(issue_id)
    if not issue:
        return jsonify({'error': 'Issue not found'}), 404
    
    # Check ownership
    if str(issue['user_id']) != user_id:
        return jsonify({'error': 'Only issue owner can close it'}), 403
    
    # Update issue
    from datetime import datetime
    update_data = {
        'status': 'solved',
        'solution_verified': True,
        'verified_at': datetime.utcnow()
    }
    
    success = Issue.update(issue_id, update_data)
    
    if success:
        # Update ministry/NGO stats
        if issue.get('government_response'):
            from app.models.ministry import Ministry
            for ministry_id in issue.get('tagged_ministries', []):
                Ministry.update_stats(str(ministry_id))
        
        if issue.get('ngo_claim'):
            from app.models.ngo import NGO
            NGO.update_stats(str(issue['ngo_claim']['ngo_id']))
        
        updated_issue = Issue.find_by_id(issue_id)
        return jsonify({
            'message': 'Issue closed successfully',
            'issue': Issue.to_dict(updated_issue)
        }), 200
    else:
        return jsonify({'error': 'Close failed'}), 500

@bp.route('/my-issues', methods=['GET'])
@jwt_required()
def get_my_issues():
    """Get current user's issues."""
    user_id = get_jwt_identity()
    
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    skip = (page - 1) * limit
    
    from bson import ObjectId
    filters = {'user_id': ObjectId(user_id)}
    
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
