#!/bin/sh
set -e

# Skip migrations if explicitly requested
if [ "$SKIP_MIGRATIONS" = "1" ] || [ "$SKIP_MIGRATIONS" = "true" ]; then
  echo "Skipping prisma generate/migrate because SKIP_MIGRATIONS is set"
else
  echo "Running prisma generate"
  npx prisma generate

  echo "Running prisma migrate deploy"
  npx prisma migrate deploy
fi

# Exec CMD from Dockerfile (node dist/main.js)
exec "$@"
