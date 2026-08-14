#!/bin/sh
set -e

if [ ! -f .env ]; then
  echo "[backend] .env not found, creating from .env-example"
  cp .env-example .env
fi

echo "[backend] running migrations..."
npm run migration:run || echo "[backend] no pending migrations (skipped)"

echo "[backend] running seeds..."
npm run seed || echo "[backend] seeds skipped"

echo "[backend] starting application..."
exec "$@"
