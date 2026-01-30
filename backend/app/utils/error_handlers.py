"""
Error handlers for the application.
"""
from flask import jsonify
from werkzeug.exceptions import HTTPException

def register_error_handlers(app):
    """Register error handlers with the Flask app."""
    
    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({'error': 'Bad request', 'message': str(e)}), 400
    
    @app.errorhandler(401)
    def unauthorized(e):
        return jsonify({'error': 'Unauthorized', 'message': 'Authentication required'}), 401
    
    @app.errorhandler(403)
    def forbidden(e):
        return jsonify({'error': 'Forbidden', 'message': 'You do not have permission'}), 403
    
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Not found', 'message': 'Resource not found'}), 404
    
    @app.errorhandler(409)
    def conflict(e):
        return jsonify({'error': 'Conflict', 'message': str(e)}), 409
    
    @app.errorhandler(422)
    def unprocessable_entity(e):
        return jsonify({'error': 'Unprocessable entity', 'message': str(e)}), 422
    
    @app.errorhandler(500)
    def internal_server_error(e):
        return jsonify({'error': 'Internal server error', 'message': 'Something went wrong'}), 500
    
    @app.errorhandler(Exception)
    def handle_exception(e):
        # Pass through HTTP errors
        if isinstance(e, HTTPException):
            return jsonify({'error': e.name, 'message': e.description}), e.code
        
        # Log the error
        app.logger.error(f'Unhandled exception: {str(e)}')
        
        # Return generic error
        return jsonify({'error': 'Internal server error', 'message': 'Something went wrong'}), 500
