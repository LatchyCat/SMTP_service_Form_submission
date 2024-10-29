from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from app.models.quote import Quote
from app.services.email_service import EmailService
from app.extensions import db

quote_routes = Blueprint('quotes', __name__)

@quote_routes.route('', methods=['POST'])  # Just empty string since prefix handles full path
@cross_origin()
def create_quote():
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'serviceType', 'projectDetails']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400

        # Create new quote
        new_quote = Quote(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            service_type=data['serviceType'],
            project_details=data['projectDetails'],
            preferred_contact_method=data.get('preferredContactMethod', 'email'),
            budget_range=data.get('budgetRange'),
            timeline=data.get('timeline')
        )

        db.session.add(new_quote)
        db.session.commit()

        # Send email notification
        email_body = f"""
        New Quote Request:

        Name: {new_quote.name}
        Email: {new_quote.email}
        Phone: {new_quote.phone}
        Service Type: {new_quote.service_type}
        Project Details: {new_quote.project_details}
        Preferred Contact: {new_quote.preferred_contact_method}
        Budget Range: {new_quote.budget_range or 'Not specified'}
        Timeline: {new_quote.timeline or 'Not specified'}
        """

        EmailService.send_email('New Quote Request', email_body)

        return jsonify({
            'success': True,
            'message': 'Quote request submitted successfully',
            'data': new_quote.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@quote_routes.route('', methods=['GET'])  # Just empty string since prefix handles full path
@cross_origin()
def get_quotes():
    try:
        quotes = Quote.query.order_by(Quote.created_at.desc()).all()
        return jsonify({
            'success': True,
            'message': 'Quotes retrieved successfully',
            'data': [quote.to_dict() for quote in quotes]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
