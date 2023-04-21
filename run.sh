#!/usr/bin/sh

cd payment
. .venv/bin/activate

cd src
flask --app api.main run --host=0.0.0.0 -p 3003
