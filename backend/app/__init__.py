"""
Application factory and initialization.
"""
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from .config import Config

# Global extensions
db_client = None
db = None
jwt = None

def create_app(config_class=Config):
    """Create and configure the Flask application."""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config['CORS_ORIGINS'],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    global jwt
    jwt = JWTManager(app)
    
    # Initialize MongoDB
    global db_client, db
    db_client = MongoClient(app.config['MONGO_URI'])
    db = db_client.get_database()
    
    # Create indexes
    _create_indexes()
    
    # Register blueprints
    from .routes import auth, issues, government, ngo, admin, public
    
    app.register_blueprint(auth.bp, url_prefix='/api/auth')
    app.register_blueprint(issues.bp, url_prefix='/api/issues')
    app.register_blueprint(government.bp, url_prefix='/api/government')
    app.register_blueprint(ngo.bp, url_prefix='/api/ngo')
    app.register_blueprint(admin.bp, url_prefix='/api/admin')
    app.register_blueprint(public.bp, url_prefix='/api')
    
    # Error handlers
    from .utils.error_handlers import register_error_handlers
    register_error_handlers(app)
    
    @app.route('/')
    def index():
        return {
            'message': 'CivikLink SL API',
            'version': '1.0.0',
            'status': 'running'
        }
    
    @app.route('/health')
    def health():
        return {'status': 'healthy'}
    
    return app

def _create_indexes():
    """Create database indexes for performance."""
    from pymongo import ASCENDING, DESCENDING, GEO2D
    from pymongo.errors import OperationFailure
    
    try:
        # Users indexes
        try:
            db.users.create_index([('email', ASCENDING)], unique=True)
        except OperationFailure:
            pass  # Index already exists
        
        try:
            db.users.create_index([('phone', ASCENDING)], unique=True, sparse=True)
        except OperationFailure:
            pass  # Index already exists
        
        try:
            db.users.create_index([('role', ASCENDING)])
        except OperationFailure:
            pass
        
        # Issues indexes
        try:
            db.issues.create_index([('location.coordinates', GEO2D)])
        except OperationFailure:
            pass
        
        try:
            db.issues.create_index([('category', ASCENDING)])
        except OperationFailure:
            pass
        
        try:
            db.issues.create_index([('status', ASCENDING)])
        except OperationFailure:
            pass
        
        try:
            db.issues.create_index([('created_at', DESCENDING)])
        except OperationFailure:
            pass
        
        try:
            db.issues.create_index([('user_id', ASCENDING)])
        except OperationFailure:
            pass
        
        try:
            db.issues.create_index([('is_crisis', ASCENDING)])
        except OperationFailure:
            pass
        
        # Notifications indexes
        try:
            db.notifications.create_index([
                ('user_id', ASCENDING),
                ('created_at', DESCENDING)
            ])
        except OperationFailure:
            pass
        
        try:
            db.notifications.create_index([('read', ASCENDING)])
        except OperationFailure:
            pass
        
        print("Database indexes verified/created successfully")
    except Exception as e:
        print(f"Warning: Could not create some indexes: {e}")
