import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Basic Flask config
    SECRET_KEY = os.getenv('SECRET_KEY', 'PeePeePooPooCheck')

    # SQLite config
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT config
    JWT_SECRET_KEY = os.getenv('SECRET_KEY', 'PeePeePooPooCheck')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"

    # CORS config
    CORS_HEADERS = 'Content-Type'

    # Email config
    MAIL_SERVER = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('EMAIL_SECURE', 'false').lower() != 'true'
    MAIL_USERNAME = os.getenv('GMAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('GMAIL_APP_PASSWORD')
    MAIL_DEFAULT_SENDER = os.getenv('GMAIL_USERNAME')
    MAIL_RECIPIENT = os.getenv('RECIPIENT_EMAIL')
