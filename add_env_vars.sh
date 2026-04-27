#!/bin/bash

# Variables a agregar
ENV_VARS=(
  "IDEALISTA_FTP_HOST=ftp.idealista.com"
  "IDEALISTA_FTP_USER=PENDING_USER_INPUT"
  "IDEALISTA_FTP_PASSWORD=PENDING_USER_INPUT"
  "IDEALISTA_FTP_PATH=/export/data.xml"
  "CRON_SECRET=kJ8mN2pQ5rT9vW3xY6zA1bC4dE7fG0hI"
)

echo "Variables de entorno a configurar en Vercel:"
echo "==========================================="
for var in "${ENV_VARS[@]}"; do
  echo "$var"
done
