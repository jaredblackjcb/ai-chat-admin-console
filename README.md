# react-django-saas
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
Backend:
(https://medium.com/@ronakchitlangya1997/social-authentication-email-using-django-and-react-js-e1cc8456262d).
Frontend:
https://www.npmjs.com/package/@react-oauth/google
