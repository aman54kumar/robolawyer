"""
Django settings for robolawyer project.
Generated by 'django-admin startproject' using Django 2.2.6.
For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

from sentry_sdk.integrations.django import DjangoIntegration
import sentry_sdk
from .utils.logging_utils import LOGGING
import dj_database_url
import os
from decouple import config, Csv
import uuid

from robolawyer.utils.email_auth import Authenticate

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=True, cast=bool)
TEMPLATE_DEBUG = DEBUG

# Application definition
SECRET_KEY = config("SECRET_KEY")

dotenv_file = os.path.join(BASE_DIR, ".env")

ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=Csv())

# EMAIL_HOST = config("EMAIL_HOST")
# EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
# EMAIL_PORT = config("EMAIL_PORT")
# EMAIL_USE_TLS = config("EMAIL_USE_TLS")

# ADMINS = [(config("ADMINS_NAME"), config("ADMINS_EMAIL"))]
# DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")
# SERVER_EMAIL = config("SERVER_EMAIL")
CLIENT_ID = config("O365_MAIL_CLIENT_ID")
SECRET_ID = config("O365_MAIL_CLIENT_SECRET")
TENANT_ID = config("O365_MAIL_TENANT_ID")

# ADMINS = [(emailAccount.get_current_user(), emailAccount.main_resource)]
# MANAGERS = ADMINS

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "storages",
    "corsheaders",
    "svglib",
    "django_extensions",
    "debug_toolbar",
    "home",
    "applicationForm",
    "about",
    "extResources",
    "robots_txt",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "compression_middleware.middleware.CompressionMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "opencensus.ext.django.middleware.OpencensusMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

ROOT_URLCONF = "robolawyer.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "robolawyer.wsgi.application"
# ASGI_APPLICATION = 'robolawyer.asgi.application'
dotenv_file = os.path.join(BASE_DIR, ".env")
if 'RDS_DB_NAME' in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': os.environ['RDS_DB_NAME'],
            'USER': os.environ['RDS_USERNAME'],
            'PASSWORD': os.environ['RDS_PASSWORD'],
            'HOST': os.environ['RDS_HOSTNAME'],
            'PORT': os.environ['RDS_PORT'],
        }
    }
else:
    if os.path.isfile(dotenv_file):
        pass
    else:
        DATABASES = {'default': dj_database_url.config()}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# TEMPLATES

TEMPLATE_DIRS = (os.path.join(os.path.dirname(__file__), "templates"),)
TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.static",
    "django.core.context_processors.tz",
    "django.contrib.messages.context_processors.messages",
    "django.core.context_processors.request",
)

# STATIC_URL = '/static/'

# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# REST_FRAMEWORK = {
#     "DATE_INPUT_FORMATS": ["%d-%m-%Y"],
# }

CORS_ORIGIN_ALLOW_ALL = True
# CORS_ALLOW_CREDENTIALS = T

# django-debug-toolbar
INTERNAL_IPS = [
    # ...
    "127.0.0.1",
    # ...
]

# sessionID
SESSIONID = uuid.uuid4().hex
STATIC_ROOT = os.path.join(BASE_DIR, "static")
# Azure
if config("ALLOWED_HOSTS") == "justbot.azurewebsites.net":
    DEFAULT_FILE_STORAGE = "backend.custom_azure.AzureMediaStorage"
    STATICFILES_STORAGE = "backend.custom_azure.AzureStaticStorage"
    AZURE_ACCOUNT_NAME = config("AZURE_ACCOUNT_NAME")
    AZURE_STORAGE_KEY = config("AZURE_STORAGE_KEY")
    AZURE_MEDIA_CONTAINER = config("AZURE_MEDIA_CONTAINER")
    AZURE_STATIC_CONTAINER = config("AZURE_STATIC_CONTAINER")
    AZURE_CUSTOM_DOMAIN = "justbotcdn.azureedge.net"
    STATIC_URL = f"https://{AZURE_CUSTOM_DOMAIN}/{AZURE_STATIC_CONTAINER}/"
    MEDIA_URL = f"https://{AZURE_CUSTOM_DOMAIN}/{AZURE_MEDIA_CONTAINER}/"
    instrumentationKey = config("INSTRUMENTATIONKEY")
    APPLICATION_INSIGHTS = {
        "ikey": (instrumentationKey),
        "use_view_name": True,
        "record_view_arguments": True,
        "endpoint": "https://westeurope-5.in.applicationinsights.azure.com/",
    }
else:
    STATIC_URL = "/static/"
    STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
)

# LOGGING


sentry_sdk.init(
    dsn="https://dc5cf96950234e3fa78a91347b3a3b9b@o1183119.ingest.sentry.io/6300288",
    integrations=[DjangoIntegration()],
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0,
    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True,
)

LOGGING = LOGGING
