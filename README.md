# Sourdough SaaS
SaaS app boilerplate built with a react frontend and django backend

# Getting Started
Run the frontend by navigating to the frontend directory and running 'npm install'.
When the installation is complete, run 'npm start' to launch the react app.

In the backend directory, create the css files and javascript bundles by running webpack using 'npm run build-dev'.
This will watch for changes to files in the assets directory and re-run the webpack pipeline on save.

Download the .env file from [GOOGLE DRIVE LINK] to get database access.

Launch the Django backend by running 'python manage.py runserver'.

# Authentication
App uses simplejwt authentication with the additional option of Google sign-in. See the below docs for more information on how it works.

## Backend
Overview (didn't follow this exactly, more of a rough outline):
(https://medium.com/@ronakchitlangya1997/social-authentication-email-using-django-and-react-js-e1cc8456262d).

Google developer console: https://console.cloud.google.com/apis/credentials?project=sourdough-saas

## Frontend
https://www.npmjs.com/package/@react-oauth/google

# Email
Admin and support email: sourdoughsaas.app@gmail.com

Emails for this project are sent using the django-anymail[amazon-ses] python package (https://anymail.dev/en/stable/esps/amazon_ses/).
It can easily be configured to use other email providers if desired.

Documentation on sending emails can be found here: https://anymail.dev/en/stable/sending/.

The email service is powered by Amazon SES (https://aws.amazon.com/ses/). While in sandbox mode, emails may only be sent to verified emails that have been set up within the SES app. Before deploying to production, you will need to contact the AWS team to activate production access for any email.

Email HTML templates are stored in the emails folder of the templates directory. Easily create new email templates using the editor on https://pro.beefree.io/.

Customize email template with personalized content using the render_to_string method of the Django template loader. Customization works the same way as any other Django template, by passing a context dictionary and referencing the variables in the HTML using the {{variable_name}} syntax.
# Production Deployment
## AWS Configuration
Run 'aws configure' and provide acces key Id and secret key.
Set region to 'us-east-1' for non-prod.
