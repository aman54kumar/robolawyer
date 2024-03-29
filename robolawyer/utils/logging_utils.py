import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "filters": {
        "require_debug_false": {
            "()": "django.utils.log.RequireDebugFalse",
        },
        "require_debug_true": {
            "()": "django.utils.log.RequireDebugTrue",
        },
    },
    "formatters": {
        "simple": {
            "format": "[%(asctime)s] %(levelname)s %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
        "verbose": {
            "format": "[%(asctime)s] %(levelname)s [%(name)s.%(funcName)s:%(lineno)d] %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "filters": ["require_debug_true"],
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "development_logfile": {
            "level": "DEBUG",
            "filters": ["require_debug_true"],
            "class": "logging.FileHandler",
            "filename": os.path.join(BASE_DIR, "justbot_dev.log"),
            "formatter": "verbose",
        },
        "production_logfile": {
            "level": "ERROR",
            "filters": ["require_debug_false"],
            "class": "logging.handlers.RotatingFileHandler",
            "filename": os.path.join(BASE_DIR, "justbot_production.log"),
            "maxBytes": 1024 * 1024 * 100,  # 100MB
            "backupCount": 5,
            "formatter": "simple",
        },
        # "sentry": {
        #     "level": "ERROR",
        #     "class": "raven.contrib.django.handlers.SentryHandler",
        #     "filters": ["require_debug_false"],
        #     "formatter": "simple",
        # },
    },
    "root": {
        "level": "DEBUG",
        "handlers": ["console"],
    },
    "loggers": {
        "coffeehouse": {
            "handlers": ["development_logfile", "production_logfile"],
        },
        "django": {
            "handlers": ["development_logfile", "production_logfile"],
        },
        "py.warnings": {
            "handlers": ["development_logfile"],
        },
    },
}
