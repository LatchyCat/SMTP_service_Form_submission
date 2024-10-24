from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.user import User
from app.extensions import db

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/api/auth/register', methods=['POST'])
@cross_origin()
def register():
    try:
        data = request.get_json()

        # Validate input
        if not all(k in data for k in ['username', 'email', 'password']):
            return jsonify({
                'success': False,
                'error': 'Missing required fields'
            }), 400

        # Check if user exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({
                'success': False,
                'error': 'Email already registered'
            }), 400
        if User.query.filter_by(username=data['username']).first():
            return jsonify({
                'success': False,
                'error': 'Username already taken'
            }), 400

        # Create new user
        user = User(
            username=data['username'],
            email=data['email']
        )
        user.set_password(data['password'])

        db.session.add(user)
        db.session.commit()

        # Create access token
        access_token = create_access_token(identity=user.id)

        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'access_token': access_token
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@auth_routes.route('/api/auth/login', methods=['POST'])
@cross_origin()
def login():
    try:
        data = request.get_json()

        if not all(k in data for k in ['email', 'password']):
            return jsonify({
                'success': False,
                'error': 'Missing required fields'
            }), 400

        user = User.query.filter_by(email=data['email']).first()

        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'access_token': access_token,
                'is_admin': user.is_admin,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }), 200

        return jsonify({
            'success': False,
            'error': 'Invalid credentials'
        }), 401
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
