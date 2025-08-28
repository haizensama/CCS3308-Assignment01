#!/bin/bash
echo "Preparing app..."
docker network create todo-net 2>/dev/null || true
docker volume create pgdata 2>/dev/null || true
docker compose build
echo "✅ Preparation complete."
