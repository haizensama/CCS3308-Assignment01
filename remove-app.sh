#!/bin/bash
echo "Removing app..."
docker compose down --volumes --rmi all --remove-orphans
docker network rm todo-net 2>/dev/null || true
echo "✅ All resources removed."

