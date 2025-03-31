#!/bin/bash

SERVICE_NAME="nextjs-perf"

# Stop and delete the service if it exists
pm2 delete "$SERVICE_NAME" > /dev/null 2>&1

# Wait for 0.5 seconds
sleep 0.5

# Start the service
echo "Starting $SERVICE_NAME..."
PORT=8002 pm2 start npm --name "$SERVICE_NAME" -- start

# Save the PM2 process list
pm2 save

# Show service status
pm2 status "$SERVICE_NAME"
