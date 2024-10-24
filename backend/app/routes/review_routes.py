from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.review import Review
from app.models.user import User  # Add this import
from app.services.email_service import EmailService
from app.extensions import db  # Use this import in route files

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/api/reviews', methods=['POST'])
@cross_origin()
@jwt_required()  # Requires authentication
def create_review():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        # Validate required fields
        required_fields = ['title', 'content', 'rating']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400

        # Validate rating range
        if not 1 <= data['rating'] <= 5:
            return jsonify({
                'success': False,
                'error': 'Rating must be between 1 and 5'
            }), 400

        # Create review
        review = Review(
            title=data['title'],
            content=data['content'],
            rating=data['rating'],
            user_id=current_user_id
        )

        db.session.add(review)
        db.session.commit()

        # Send email notification
        user = User.query.get(current_user_id)
        email_body = f"""
        New Review Submission:
        User: {user.username}
        Title: {data['title']}
        Rating: {data['rating']}
        Review: {data['content']}
        """
        EmailService.send_email('New Review Submission', email_body)

        return jsonify({
            'success': True,
            'message': 'Review submitted successfully',
            'data': {
                'id': review.id,
                'title': review.title,
                'content': review.content,
                'rating': review.rating,
                'created_at': review.created_at.isoformat(),
                'author': user.username
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@review_routes.route('/api/reviews', methods=['GET'])
@cross_origin()
def get_reviews():
    try:
        reviews = Review.query.order_by(Review.created_at.desc()).all()

        return jsonify({
            'success': True,
            'message': 'Reviews retrieved successfully',
            'data': [{
                'id': review.id,
                'title': review.title,
                'content': review.content,
                'rating': review.rating,
                'created_at': review.created_at.isoformat(),
                'author': review.author.username if review.author else 'Anonymous'
            } for review in reviews]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@review_routes.route('/api/reviews/<int:review_id>', methods=['PUT'])
@cross_origin()
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

@review_routes.route('/api/reviews/<int:review_id>', methods=['DELETE'])
@cross_origin()
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
