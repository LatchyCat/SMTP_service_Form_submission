import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import Config

class EmailService:
    @staticmethod
    def send_email(subject, body, to_email=None):
        if to_email is None:
            to_email = Config.RECIPIENT_EMAIL

        msg = MIMEMultipart()
        msg['From'] = Config.MAIL_USERNAME
        msg['To'] = to_email
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'plain'))

        try:
            server = smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT)
            server.starttls()
            server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
            text = msg.as_string()
            server.sendmail(Config.MAIL_USERNAME, to_email, text)
            server.quit()
            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False
