<!-- models include: -->

Full CRUD operations
Data validation
Relationship management
Timestamp tracking
Status management for quotes
Email notifications
Proper error handling
JSON serialization


╭─latchy at Oriel’s MacBook Pro in ~/smtp_service_form_submission/backend using «venv»
╰─○ sqlite3 instance/app.db
SQLite version 3.43.2 2023-10-10 13:08:14
Enter ".help" for usage hints.
sqlite> .tables  -- Should show quotes, reviews, and users tables
sqlite> .schema users
CREATE TABLE users (
	id INTEGER NOT NULL,
	username VARCHAR(80) NOT NULL,
	email VARCHAR(120) NOT NULL,
	password_hash VARCHAR(128),
	created_at DATETIME,
	PRIMARY KEY (id),
	UNIQUE (email),
	UNIQUE (username)
);
sqlite> .schema reviews
CREATE TABLE reviews (
	id INTEGER NOT NULL,
	title VARCHAR(100) NOT NULL,
	content TEXT NOT NULL,
	rating INTEGER NOT NULL,
	created_at DATETIME,
	updated_at DATETIME,
	user_id INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(user_id) REFERENCES users (id)
);
sqlite> .schema quotes
CREATE TABLE quotes (
	id INTEGER NOT NULL,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(120) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	service_type VARCHAR(100) NOT NULL,
	project_details TEXT NOT NULL,
	preferred_contact_method VARCHAR(20),
	budget_range VARCHAR(50),
	timeline VARCHAR(100),
	status VARCHAR(20),
	created_at DATETIME,
	updated_at DATETIME,
	PRIMARY KEY (id)
);
sqlite> .quit
╭─latchy at Oriel’s MacBook Pro in ~/smtp_service_form_submission/backend using «venv»
╰─○
