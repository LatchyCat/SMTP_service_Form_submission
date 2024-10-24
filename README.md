# D-Rock Construction LLC - Review & Quote System 🏗️

A modern, full-stack web application for D-Rock Construction LLC, enabling customer reviews and quote requests with admin functionality. Built with React, Flask, and SQLite.

## 🌟 Features

### 📝 Customer Reviews
- Authenticated users can post, edit, and delete their reviews
- Star rating system (1-5 stars)
- Real-time review updates
- Admin moderation capabilities
- Public view for all visitors

### 💼 Quote Requests
- Streamlined quote submission process
- Detailed project information collection
- Budget and timeline tracking
- Automatic email notifications

### 👤 User Management
- Secure user registration and authentication
- JWT-based authorization
- Role-based access control (Admin/User)
- Profile management

### 👨‍💼 Admin Dashboard
- Review moderation capabilities
- Quote request management
- User supervision
- Content moderation tools

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Formik & Yup** - Form handling and validation

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Flask-JWT-Extended** - JWT authentication
- **Flask-Migrate** - Database migrations
- **Flask-CORS** - Cross-Origin Resource Sharing
- **SQLite** - Database
- **Gmail SMTP** - Email notifications

## 📋 Prerequisites
- Python 3.8+
- Node.js 14+
- npm/yarn
- Gmail account for SMTP services

## 🚀 Installation

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/drock-construction.git
cd drock-construction/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configurations

# Initialize database
flask db upgrade

# Create admin user
flask create-superuser

# Run the server
python run.py
```


Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

🏗️ Project Structure
```
drock-construction/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── migrations/
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── views/
    │   └── services/
    └── package.json
```

🔒 Security Features

Password hashing with Werkzeug
JWT authentication
CORS protection
Input validation
SQL injection prevention
XSS protection

📧 Email Notifications
The application uses Gmail SMTP for:

New review notifications
Quote request alerts
User registration confirmations

🎨 UI/UX Features

Responsive design
Mobile-first approach
Intuitive navigation
Clean and modern interface
Loading states
Error handling
Success notifications

🛣️ API Endpoints
Authentication

POST /api/auth/register - User registration
POST /api/auth/login - User login

Reviews

GET /api/reviews - Get all reviews
POST /api/reviews - Create review
PUT /api/reviews/:id - Update review
DELETE /api/reviews/:id - Delete review

Quotes

POST /api/quotes - Submit quote request
GET /api/quotes - Get all quotes (admin only)

👥 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.


📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
👋 Contact
For any questions or feedback, please contact:

Email: drockconstructionllc1@gmail.com
Website: [drockconstructionllc.com]

```
This README:
1. Provides a comprehensive overview of your project
2. Details all features and technologies used
3. Includes clear installation instructions
4. Shows the project structure
5. Lists API endpoints
6. Includes security features
7. Describes email functionality
8. Uses emojis for visual appeal
9. Includes contribution guidelines
10. Provides contact information
```
