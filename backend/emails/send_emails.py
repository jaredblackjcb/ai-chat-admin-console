import os
from pathlib import Path
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from .email_text import *

def send_welcome_email(email_address, first_name="there"):
    # Create a new email object with plain text subject and body
    msg = EmailMultiAlternatives(WELCOME_EMAIL_SUBJECT, WELCOME_EMAIL_BODY,
                                "sourdoughsaas.app@gmail.com", [email_address])
    # Load and attach the HTML template with custom variables
    context_dict = {'first_name': first_name}
    email_template = render_to_string('emails/welcome.html', context=context_dict)
    msg.attach_alternative(email_template, "text/html")
    # Set any other options on msg here, then send the email
    msg.send()