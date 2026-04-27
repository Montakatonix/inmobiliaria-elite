#!/bin/bash

# Actualizar package.json para incluir migraciones en el build
cat package.json | jq '.scripts.build = "drizzle-kit push && next build"' > package.json.tmp && mv package.json.tmp package.json

echo "✅ Build script actualizado para incluir migraciones"
cat package.json | grep -A 1 '"build"'

