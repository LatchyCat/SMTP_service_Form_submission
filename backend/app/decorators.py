from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from app.models.user import User

def admin_required():
    """Decorator to check if the current user has admin privileges"""
    def wrapper(fn):
        @wraps(fn)
        def decorated_function(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)

            if not user or not user.is_admin:
                return jsonify({'error': 'Admin privileges required'}), 403

            return fn(*args, **kwargs)
        return decorated_function
    return wrapper
