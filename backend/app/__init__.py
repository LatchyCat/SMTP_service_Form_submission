from flask import Flask, request
from flask_cors import CORS
from app.extensions import db, migrate, jwt
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configure CORS
    CORS(app,
         resources={
             r"/*": {
                 "origins": ["http://localhost:3000"],
                 "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
                 "allow_headers": ["Content-Type", "Authorization", "Accept"],
                 "supports_credentials": True,
                 "expose_headers": ["Content-Type", "Authorization"],
                 "max_age": 600  # Cache preflight requests for 10 minutes
             }
         })


    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Import models
    from app.models.user import User
    from app.models.review import Review
    from app.models.quote import Quote

    # Register CLI commands
    from app.cli import init_cli
    init_cli(app)

    # Register blueprints
    from app.routes.auth_routes import auth_routes
    from app.routes.review_routes import review_routes
    from app.routes.quote_routes import quote_routes

    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(review_routes, url_prefix='/api/reviews')
    app.register_blueprint(quote_routes, url_prefix='/api/quotes')


    # Add CORS preflight handler
    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS":
            response = app.make_default_options_response()
            return response

    return app
