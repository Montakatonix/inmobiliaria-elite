# PLAN DE RESET COMPLETO

## Problema
Los últimos deployments fallan porque tienen dependencias rotas de intentos anteriores de sync

## Solución
1. Eliminar TODOS los archivos de sincronización de Idealista/FTP
2. Dejar SOLO el código simple de consulta a la API del CRM
3. Hacer un commit limpio

## Archivos a ELIMINAR:
- src/lib/idealista/* (todo el directorio)
- src/lib/crm/sync-service.ts
- src/app/api/admin/sync-idealista/route.ts (reemplazar con versión simple)
- src/app/api/admin/setup-db/route.ts
- src/app/api/cron/sync-daily/route.ts
- src/db/* (todo el directorio)

## Archivos a MANTENER:
- src/lib/crm-api.ts (nuevo, simple)
- src/app/api/properties/route.ts (nuevo, simple)
- src/app/api/lead/route.ts (ya existe, funciona)

