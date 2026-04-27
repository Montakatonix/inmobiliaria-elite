#!/bin/bash

echo "🔧 Ejecutando migraciones de base de datos..."
echo "=============================================="
echo ""

# Verificar si existe .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  No se encontró .env.local"
    echo "📥 Descargando variables de entorno de Vercel..."
    npx vercel env pull .env.local
fi

echo ""
echo "✅ Variables de entorno configuradas"
echo ""
echo "🗄️  Ejecutando migraciones..."
npm run db:push

echo ""
echo "✅ Migraciones completadas!"

