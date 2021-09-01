# # gunicorn --workers 8 --threads 4 --timeout 60 --access-logfile \
# #     '-' --error-logfile '-' --bind=0.0.0.0:8000  -k uvicorn.workers.UvicornWorker \
# #      --chdir=/home/site/wwwroot robolawyer.asgi
# gunicorn robolawyer.asgi --log-level=debug -k uvicorn.workers.UvicornWorker \
# --log-file - --timeout 60