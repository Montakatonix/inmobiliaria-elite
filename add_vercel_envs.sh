#!/bin/bash

# Variables a agregar
PROJECT_ID="prj_M2qJukgCV13ygeeHp7Ue1Oqf0nl0"
TEAM_ID="team_KTa7YsFaQABxQWcNCAFFdZXr"

echo "Agregando variables de entorno a Vercel..."
echo "==========================================="
echo ""

# Nota: Este es un script de referencia
# Las variables se configurarán mediante la UI de Vercel

cat << 'VARS'
Variables a configurar:

1. IDEALISTA_FTP_HOST=ftp.idealista.com
2. IDEALISTA_FTP_USER=es130563115
3. IDEALISTA_FTP_PASSWORD=dPXk{;dN:.z&8c2}
4. IDEALISTA_FTP_PATH=/export/data.xml
5. CRON_SECRET=kJ8mN2pQ5rT9vW3xY6zA1bC4dE7fG0hI

Ambientes: Production, Preview, Development (todos marcados)
VARS

