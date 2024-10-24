from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Review, User, db

review_bp = Blueprint('review', __name__)

@review_bp.route('/api/reviews', methods=['POST'])
@jwt_required()
def create_review():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        # Validate required fields
        required_fields = ['title', 'content', 'rating']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Validate rating is between 1 and 5
        if not 1 <= data['rating'] <= 5:
            return jsonify({'error': 'Rating must be between 1 and 5'}), 400

        # Create new review
        new_review = Review(
            title=data['title'],
            content=data['content'],
            rating=data['rating'],
            user_id=current_user_id
        )

        db.session.add(new_review)
        db.session.commit()

        return jsonify({
            'message': 'Review created successfully',
            'data': new_review.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@review_bp.route('/api/reviews', methods=['GET'])
def get_reviews():
    try:
        reviews = Review.query.order_by(Review.created_at.desc()).all()
        return jsonify({
            'message': 'Reviews retrieved successfully',
            'data': [review.to_dict() for review in reviews]
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
