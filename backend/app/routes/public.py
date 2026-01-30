"""
Public routes - Leaderboard, statistics, search, categories (no auth required).
"""
from flask import Blueprint, request, jsonify
from app.models.issue import Issue
from app.models.ministry import Ministry
from app.models.ngo import NGO
from app import db

bp = Blueprint('public', __name__)

@bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get performance leaderboard (ministries and NGOs)."""
    # Get all ministries with stats
    ministries = Ministry.get_all(limit=100)
    
    # Sort by solved issues percentage
    ministry_leaderboard = sorted(
        ministries,
        key=lambda m: (m['performance_stats']['solved'] / m['performance_stats']['total_issues'] * 100
                      if m['performance_stats']['total_issues'] > 0 else 0),
        reverse=True
    )[:10]
    
    # Get all verified NGOs with stats
    ngos = NGO.get_all({'verified': True}, limit=100)
    
    # Sort by success rate
    ngo_leaderboard = sorted(
        ngos,
        key=lambda n: n['performance_stats']['success_rate'],
        reverse=True
    )[:10]
    
    return jsonify({
        'ministries': ministry_leaderboard,
        'ngos': ngo_leaderboard
    }), 200

@bp.route('/stats', methods=['GET'])
def get_stats():
    """Get public platform statistics."""
    from app.models.user import User
    
    total_issues = Issue.count()
    solved_issues = Issue.count({'status': 'solved'})
    active_users = User.count({'status': 'active'})
    verified_ngos = NGO.count({'verified': True})
    
    # Issues by category
    category_distribution = list(db.issues.aggregate([
        {'$group': {'_id': '$category', 'count': {'$sum': 1}}}
    ]))
    
    # Top districts
    district_distribution = list(db.issues.aggregate([
        {'$group': {'_id': '$location.district', 'count': {'$sum': 1}}},
        {'$sort': {'count': -1}},
        {'$limit': 10}
    ]))
    
    return jsonify({
        'total_issues': total_issues,
        'solved_issues': solved_issues,
        'active_users': active_users,
        'verified_ngos': verified_ngos,
        'resolution_rate': round((solved_issues / total_issues * 100) if total_issues > 0 else 0, 2),
        'by_category': category_distribution,
        'top_districts': district_distribution
    }), 200

@bp.route('/districts', methods=['GET'])
def get_districts():
    """Get list of Sri Lankan districts."""
    districts = [
        "Colombo", "Gampaha", "Kalutara",  # Western
        "Kandy", "Matale", "Nuwara Eliya",  # Central
        "Galle", "Matara", "Hambantota",  # Southern
        "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu",  # Northern
        "Batticaloa", "Ampara", "Trincomalee",  # Eastern
        "Kurunegala", "Puttalam",  # North Western
        "Anuradhapura", "Polonnaruwa",  # North Central
        "Badulla", "Monaragala",  # Uva
        "Ratnapura", "Kegalle"  # Sabaragamuwa
    ]
    
    return jsonify({'districts': sorted(districts)}), 200

@bp.route('/categories', methods=['GET'])
def get_categories():
    """Get issue categories."""
    categories = [
        {'id': 'water', 'name_en': 'Water Supply', 'name_si': 'ජල සම්පාදනය', 'name_ta': 'நீர் வழங்கல்'},
        {'id': 'electricity', 'name_en': 'Electricity', 'name_si': 'විදුලිය', 'name_ta': 'மின்சாரம்'},
        {'id': 'road', 'name_en': 'Road Issues', 'name_si': 'මාර්ග ගැටලු', 'name_ta': 'சாலை பிரச்சனைகள்'},
        {'id': 'flood', 'name_en': 'Flood/Disaster', 'name_si': 'ගංවතුර/ආපදා', 'name_ta': 'வெள்ளம்/பேரழிவு'},
        {'id': 'waste', 'name_en': 'Waste Management', 'name_si': 'අපද්‍රව්‍ය කළමනාකරණය', 'name_ta': 'கழிவு மேலாண்மை'},
        {'id': 'other', 'name_en': 'Other', 'name_si': 'වෙනත්', 'name_ta': 'மற்றவை'}
    ]
    
    return jsonify({'categories': categories}), 200

@bp.route('/ministries', methods=['GET'])
def get_ministries():
    """Get all ministries (public)."""
    ministries = Ministry.get_all(limit=100)
    return jsonify({'ministries': ministries}), 200

@bp.route('/search', methods=['GET'])
def search_issues():
    """Search issues by keyword."""
    query = request.args.get('q', '')
    
    if not query or len(query) < 3:
        return jsonify({'error': 'Search query must be at least 3 characters'}), 400
    
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    skip = (page - 1) * limit
    
    # Search in title and description
    import re
    regex = re.compile(re.escape(query), re.IGNORECASE)
    
    pipeline = [
        {
            '$match': {
                '$or': [
                    {'title': {'$regex': regex}},
                    {'description': {'$regex': regex}}
                ]
            }
        },
        {'$sort': {'created_at': -1}},
        {'$skip': skip},
        {'$limit': limit}
    ]
    
    results = list(db.issues.aggregate(pipeline))
    total = db.issues.count_documents({
        '$or': [
            {'title': {'$regex': regex}},
            {'description': {'$regex': regex}}
        ]
    })
    
    issues = [Issue.to_dict(issue) for issue in results]
    
    return jsonify({
        'issues': issues,
        'pagination': {
            'page': page,
            'limit': limit,
            'total': total,
            'pages': (total + limit - 1) // limit
        }
    }), 200

@bp.route('/crisis-map', methods=['GET'])
def get_crisis_map():
    """Get crisis issues for heatmap."""
    # Get all crisis issues
    filters = {'is_crisis': True, 'status': {'$in': ['pending', 'verified', 'in_progress']}}
    
    crisis_issues = Issue.get_all(filters, limit=1000)
    
    # Group by district
    district_counts = {}
    for issue in crisis_issues:
        district = issue['location']['district']
        district_counts[district] = district_counts.get(district, 0) + 1
    
    return jsonify({
        'crisis_issues': crisis_issues,
        'district_counts': district_counts,
        'total_crisis': len(crisis_issues)
    }), 200
