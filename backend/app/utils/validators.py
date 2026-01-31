"""
Validation utilities.
"""
import re

def validate_email(email):
    """Validate email format."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """
    Validate password strength.
    Requirements: At least 8 characters, 1 uppercase, 1 lowercase, 1 number.
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    
    if not re.search(r'\d', password):
        return False, "Password must contain at least one number"
    
    return True, "Password is valid"

def validate_phone(phone):
    """Validate Sri Lankan phone number."""
    # Sri Lankan phone numbers: 0XXXXXXXXX (10 digits starting with 0)
    pattern = r'^0\d{9}$'
    return re.match(pattern, phone) is not None

def validate_required_fields(data, required_fields):
    """Check if all required fields are present in data."""
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"
    
    return True, "All required fields present"

def validate_coordinates(lat, lng):
    """Validate latitude and longitude."""
    try:
        lat = float(lat)
        lng = float(lng)
        
        # Sri Lanka coordinates range
        if not (5.9 <= lat <= 9.9):
            return False, "Latitude out of range for Sri Lanka"
        
        if not (79.5 <= lng <= 82.0):
            return False, "Longitude out of range for Sri Lanka"
        
        return True, "Coordinates valid"
    except (ValueError, TypeError):
        return False, "Invalid coordinate format"

def sanitize_input(text):
    """Sanitize user input to prevent injection attacks."""
    if not text:
        return text
    
    # Remove any HTML tags
    text = re.sub(r'<[^>]+>', '', str(text))
    
    # Remove excessive whitespace
    text = ' '.join(text.split())
    
    return text.strip()

def validate_file_extension(filename, allowed_extensions):
    """Validate file extension."""
    if not filename or '.' not in filename:
        return False
    
    extension = filename.rsplit('.', 1)[1].lower()
    return extension in allowed_extensions

def validate_image_file(filename):
    """Validate image file extension."""
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    return validate_file_extension(filename, allowed_extensions)

def validate_url(url):
    """Validate URL format."""
    pattern = r'^https?://[\w\-\.]+\.\w{2,}(/.*)?$'
    return re.match(pattern, url) is not None

def validate_category(category):
    """Validate issue category."""
    valid_categories = ['water', 'electricity', 'road', 'flood', 'waste', 'other']
    return category in valid_categories

def validate_district(district):
    """Validate Sri Lankan district."""
    valid_districts = [
        "Colombo", "Gampaha", "Kalutara",
        "Kandy", "Matale", "Nuwara Eliya",
        "Galle", "Matara", "Hambantota",
        "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu",
        "Batticaloa", "Ampara", "Trincomalee",
        "Kurunegala", "Puttalam",
        "Anuradhapura", "Polonnaruwa",
        "Badulla", "Monaragala",
        "Ratnapura", "Kegalle"
    ]
    return district in valid_districts

def validate_status(status):
    """Validate issue status."""
    valid_statuses = ['pending', 'verified', 'in_progress', 'solved', 'rejected']
    return status in valid_statuses

def validate_priority(priority):
    """Validate issue priority."""
    valid_priorities = ['low', 'medium', 'high', 'critical']
    return priority in valid_priorities
