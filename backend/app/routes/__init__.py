from flask import Blueprint

# Create blueprints with a name parameter
auth_routes = Blueprint('auth', __name__)
review_routes = Blueprint('reviews', __name__)
quote_routes = Blueprint('quotes', __name__)

# Import routes after creating blueprints to avoid circular imports
from app.routes import review_routes as review_views
from app.routes import quote_routes as quote_views
from app.routes import auth_routes as auth_views
