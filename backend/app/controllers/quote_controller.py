from flask import Blueprint, request, jsonify
from app.models import Quote, db
from app.services.email_service import EmailService


quote_bp = Blueprint('quote', __name__)

@quote_bp.route('/api/quotes', methods=['POST'])
def create_quote():
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'service_type',
                         'project_details', 'preferred_contact_method']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Create new quote
        new_quote = Quote(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            service_type=data['service_type'],
            project_details=data['project_details'],
            preferred_contact_method=data['preferred_contact_method'],
            budget_range=data.get('budget_range'),
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
            'message': 'Quote request submitted successfully',
            'data': new_quote.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@quote_bp.route('/api/quotes', methods=['GET'])
def get_quotes():
    try:
        quotes = Quote.query.order_by(Quote.created_at.desc()).all()
        return jsonify({
            'message': 'Quotes retrieved successfully',
            'data': [quote.to_dict() for quote in quotes]
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
