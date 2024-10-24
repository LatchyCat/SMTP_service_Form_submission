from datetime import datetime
from app.extensions import db  # Use this import in all model files

class Quote(db.Model):
    __tablename__ = 'quotes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    service_type = db.Column(db.String(100), nullable=False)
    project_details = db.Column(db.Text, nullable=False)
    preferred_contact_method = db.Column(db.String(20), default='email')
    budget_range = db.Column(db.String(50))
    timeline = db.Column(db.String(100))
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Quote {self.id}: {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'service_type': self.service_type,
            'project_details': self.project_details,
            'preferred_contact_method': self.preferred_contact_method,
            'budget_range': self.budget_range,
            'timeline': self.timeline,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
