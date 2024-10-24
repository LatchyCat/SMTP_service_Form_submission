import click
from flask.cli import with_appcontext
from app.extensions import db
from app.models.user import User

def init_cli(app):
    @app.cli.command("create-superuser")
    def create_superuser():
        """Create a superuser account"""
        try:
            # Check if superuser already exists
            if User.query.filter_by(username="superuser").first():
                click.echo("Superuser already exists!")
                return

            user = User(
                username="superuser",
                email="drockconstructionllc1@gmail.com",
                is_admin=True
            )
            user.set_password("drocksuperuser@1")

            db.session.add(user)
            db.session.commit()

            click.echo("Superuser created successfully!")
        except Exception as e:
            click.echo(f"Error creating superuser: {str(e)}")
            db.session.rollback()
