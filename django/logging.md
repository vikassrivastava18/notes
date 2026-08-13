The community-wide applicability rules for logging levels are as follows:

```
DEBUG: logging.DEBUG can be used to log detailed information for debugging code in development, such as when the app starts.

INFO: logging.INFO can be used to log information about the code if it is running as expected, such as when a process starts in the app.

WARNING: logging.WARNING can be used to report unexpected behavior that could cause a future problem but isn’t impacting the current process of the application, such as when the app detects low memory.

ERROR: logging.ERROR can be used to report events when the software fails to perform some action, such as when the app fails to save data due to insufficient permissions given to the user.

CRITICAL: logging.CRITICAL can be used to report serious errors that impact the continued execution of the application, such as when the application fails to store data due to insufficient memory.
```

Configuration:

```
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"verbose": {"format": "%(asctime)s %(process)d %(thread)d %(message)s"}},
    "loggers": {
        "django_default": {
            "handlers": ["django_file"],
            "level": "INFO",
        },
    },
    "handlers": {
        "django_file": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": "path/to/django_logs.log",
            "maxBytes": 1024 * 1024 * 10,  # 10MB
            "backupCount": 10,
            "formatter": "verbose"
        },
    },
}
```

- version: This means the configuration version used is logging.config.dictConfig version 1 format.

- disable_existing_logger: Django provides a few default logging configurations. The disable_existing_loggers flag is used to enable/disable the default logging configuration setting.

- formatters: Formatters are key-value pairs, with each key representing a formatter we can use for logging messages. We have configured a verbose formatter to log additional info like timestamps..

- loggers: Loggers are namespaces used when we create logs. One application can have multiple loggers. In our app, we are naming the custom logger django_default, and whenever we have to use this logging configuration, we would use this name.

    - level: Levels are used to filter out log levels. Here, we have defined the INFO level, which means any level that is is equal or above the INFO level would be using this configuration. DEBUG will be ignored

- handlers: They map each logger namespace to different handlers. These handlers are engines that determmine how to process each log message. In our config, we are defining the django_file handler that writes logs to files. 
    - class: This determines how the log messages are going to be processed. We are passing the RotatingFileHandler class, whic means new log files are going to be created every time we have out previous log file filled with 10 MB logs that we are configuring.

    - filename: Name of the file should be provided with absolut path for the file.

    - maxBytes: Maximum size of file before new file is created.

    - backupCount: This is the total number of file counts that would be created before reusing the older files by rotation.

    - fomatter: Format we want to use for the log messages.

    