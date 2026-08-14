#!/bin/sh
set -e

if [ ! -f .env ]; then
  echo "[frontend] .env not found, creating from .env-example"
  cp .env-example .env
fi

echo "[frontend] starting application..."
exec "$@"
