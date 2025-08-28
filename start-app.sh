#!/bin/bash
echo "Starting app..."
docker compose up -d
echo "✅ App running."
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"

