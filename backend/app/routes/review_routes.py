from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.review import Review
from app.models.user import User
from app.extensions import db
import logging

review_routes = Blueprint('reviews', __name__)

@review_routes.route('', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify({
        'success': True,
        'data': [review.to_dict() for review in reviews]
    })

@review_routes.route('', methods=['POST', 'OPTIONS'])
@jwt_required()
def create_review():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    try:
        # Debug logging
        print("Headers received:", dict(request.headers))
        data = request.get_json()
        print("Data received:", data)
        current_user_id = get_jwt_identity()
        print("Current user ID:", current_user_id)

        # Validate data presence
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 422

        # Validate required fields
        required_fields = ['title', 'content', 'rating']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({
                'success': False,
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 422

        # Validate rating
        rating = data.get('rating')
        if not isinstance(rating, (int, float)) or not (1 <= float(rating) <= 5):
            return jsonify({
                'success': False,
                'error': f'Invalid rating value: {rating}. Must be between 1 and 5'
            }), 422

        # Validate user existence
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({
                'success': False,
                'error': 'User not found'
            }), 422

        # Create review
        review = Review(
            title=data['title'],
            content=data['content'],
            rating=float(rating),
            user_id=current_user_id
        )

        print("Creating review:", review)
        db.session.add(review)
        db.session.commit()
        print("Review created successfully")

        return jsonify({
            'success': True,
            'message': 'Review created successfully',
            'data': review.to_dict()
        }), 201

    except Exception as e:
        print(f"Error in create_review: {str(e)}")
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@review_routes.route('/<int:review_id>', methods=['PUT'])  # Fixed route path
@jwt_required()
def update_review(review_id):
    try:
        current_user_id = get_jwt_identity()
        review = Review.query.get_or_404(review_id)

        # Check if the user owns this review
        if review.user_id != current_user_id:
            return jsonify({
                'success': False,
                'error': 'Unauthorized'
            }), 403

        data = request.get_json()

        # Update allowed fields
        if 'title' in data:
            review.title = data['title']
        if 'content' in data:
            review.content = data['content']
        if 'rating' in data:
            if 1 <= data['rating'] <= 5:
                review.rating = data['rating']
            else:
                return jsonify({
                    'success': False,
                    'error': 'Rating must be between 1 and 5'
                }), 400

        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Review updated successfully',
            'data': {
                'id': review.id,
                'title': review.title,
                'content': review.content,
                'rating': review.rating,
                'created_at': review.created_at.isoformat(),
                'author': review.author.username
            }
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@review_routes.route('/<int:review_id>', methods=['DELETE'])  # Fixed route path
@jwt_required()
def delete_review(review_id):
    try:
        current_user_id = get_jwt_identity()
        review = Review.query.get_or_404(review_id)
        user = User.query.get(current_user_id)

        # Check if user is admin or the owner of the review
        if not (user.is_admin or review.user_id == current_user_id):
            return jsonify({
                'success': False,
                'error': 'Unauthorized: You must be an admin or the review owner to delete this review'
            }), 403

        db.session.delete(review)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Review deleted successfully',
            'deleted_by': 'admin' if user.is_admin else 'owner'
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
