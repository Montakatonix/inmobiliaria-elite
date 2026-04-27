# 📋 Checklist de Despliegue - Idealista Sync

## ✅ PRE-DESPLIEGUE (Desarrollo Local)

### 1. Crear base de datos Vercel Postgres

- [ ] Ir a Vercel Dashboard
- [ ] Ir a Storage > Create Database > Postgres
- [ ] Nombrar: `inmobiliaria-elite-db`
- [ ] Región: eu-central-1 (Frankfurt - más cercano a España)
- [ ] Copiar credenciales generadas

### 2. Configurar variables de entorno local

- [ ] Copiar `.env.local.example` → `.env.local`
- [ ] Pegar credenciales de Postgres (copiar de Vercel)
- [ ] Configurar credenciales FTP de Idealista:
  - `IDEALISTA_FTP_USER`
  - `IDEALISTA_FTP_PASSWORD`
- [ ] Generar UUIDs para secrets:
  ```bash
  # macOS/Linux
  uuidgen
  # Windows PowerShell
  [guid]::NewGuid()
  ```
- [ ] Configurar `IDEALISTA_SYNC_SECRET`
- [ ] Configurar `CRON_SECRET`

### 3. Instalar dependencias

```bash
npm install
```

### 4. Crear tablas en base de datos

```bash
npm run db:push
```

Verificar que se crearon:
- [ ] Tabla `properties` 
- [ ] Tabla `sync_logs`

### 5. Probar sincronización localmente

```bash
# Iniciar servidor
npm run dev

# En otra terminal, ejecutar sync manual
curl -X POST http://localhost:3000/api/admin/sync-idealista \
  -H "Authorization: Bearer TU_IDEALISTA_SYNC_SECRET"
```

- [ ] Verificar que descarga XML
- [ ] Verificar que parsea correctamente
- [ ] Verificar que crea propiedades en BD
- [ ] Verificar logs en consola

### 6. Verificar propiedades en frontend

- [ ] Abrir http://localhost:3000/comprar
- [ ] Verificar que aparecen propiedades
- [ ] Verificar imágenes
- [ ] Verificar página de detalle

---

## 🚀 DESPLIEGUE EN VERCEL

### 1. Push código a GitHub

```bash
git add .
git commit -m "feat: add Idealista sync system"
git push origin main
```

### 2. Conectar proyecto en Vercel

- [ ] Ir a https://vercel.com
- [ ] Clic en "Add New..." > "Project"
- [ ] Importar repositorio `inmobiliaria-elite`
- [ ] Vercel detectará Next.js automáticamente
- [ ] **NO hacer deploy todavía** - primero configurar variables

### 3. Conectar base de datos al proyecto

- [ ] En project settings > Storage
- [ ] Clic en "Connect Store"
- [ ] Seleccionar la base de datos creada anteriormente
- [ ] Vercel añadirá automáticamente las variables `POSTGRES_*`

### 4. Añadir variables de entorno en Vercel

En Settings > Environment Variables, añadir:

**FTP Idealista:**
- [ ] `IDEALISTA_FTP_HOST` = `ftp.idealista.com`
- [ ] `IDEALISTA_FTP_USER` = [tu usuario]
- [ ] `IDEALISTA_FTP_PASSWORD` = [tu contraseña]
- [ ] `IDEALISTA_FTP_PATH` = `/export/data.xml`

**Secrets:**
- [ ] `IDEALISTA_SYNC_SECRET` = [UUID generado]
- [ ] `CRON_SECRET` = [UUID generado]

**IMPORTANTE:** Usar los mismos UUIDs que en local.

Para cada variable:
- Añadir a: Production, Preview, Development
- Save

### 5. Primer Deploy

- [ ] Clic en "Deploy"
- [ ] Esperar a que termine (2-3 minutos)
- [ ] Verificar que el build fue exitoso

### 6. Verificar despliegue

- [ ] Abrir URL de producción (ej: `inmobiliaria-elite.vercel.app`)
- [ ] Verificar que el sitio carga
- [ ] **NO debería haber propiedades todavía** (BD vacía)

---

## 🔄 POST-DESPLIEGUE

### 1. Ejecutar primera sincronización

```bash
curl -X POST https://TU-SITIO.vercel.app/api/admin/sync-idealista \
  -H "Authorization: Bearer TU_IDEALISTA_SYNC_SECRET"
```

- [ ] Verificar respuesta exitosa (HTTP 200)
- [ ] Verificar contadores: `created`, `updated`, `inactivated`

### 2. Verificar propiedades en producción

- [ ] Abrir https://TU-SITIO.vercel.app/comprar
- [ ] Verificar que aparecen propiedades
- [ ] Hacer clic en una propiedad
- [ ] Verificar página de detalle
- [ ] Verificar imágenes

### 3. Verificar logs en Vercel

- [ ] Ir a Vercel Dashboard > tu proyecto > Logs
- [ ] Buscar logs de `/api/admin/sync-idealista`
- [ ] Verificar que no hay errores

### 4. Verificar cron job

- [ ] En Vercel Dashboard > Settings > Cron Jobs
- [ ] Verificar que aparece el cron job
- [ ] Schedule: `0 2 * * *`
- [ ] Path: `/api/cron/sync-daily`

**Nota:** El cron job se ejecutará automáticamente mañana a las 2 AM UTC.

### 5. Probar cron manualmente (opcional)

```bash
curl https://TU-SITIO.vercel.app/api/cron/sync-daily \
  -H "Authorization: Bearer TU_CRON_SECRET"
```

- [ ] Verificar respuesta exitosa

---

## 🗑️ LIMPIEZA DE DATOS DEMO

### Opción 1: Inactivar propiedades demo

```sql
UPDATE properties 
SET status = 'inactive' 
WHERE source = 'demo';
```

### Opción 2: Eliminar propiedades demo

```sql
DELETE FROM properties 
WHERE source = 'demo';
```

**Recomendación:** Usar Opción 1 (inactivar) para no perder datos.

---

## 🧪 TESTING POST-DEPLOY

### Test 1: Sincronización manual funciona

```bash
curl -X POST https://TU-SITIO.vercel.app/api/admin/sync-idealista \
  -H "Authorization: Bearer WRONG_SECRET"
```

- [ ] Debe devolver 401 Unauthorized

```bash
curl -X POST https://TU-SITIO.vercel.app/api/admin/sync-idealista \
  -H "Authorization: Bearer TU_IDEALISTA_SYNC_SECRET"
```

- [ ] Debe devolver 200 + `{"success": true, ...}`

### Test 2: Endpoint cron protegido

```bash
curl https://TU-SITIO.vercel.app/api/cron/sync-daily
```

- [ ] Debe devolver 401 Unauthorized

### Test 3: Frontend muestra propiedades

- [ ] /comprar lista propiedades
- [ ] /comprar/[slug] muestra detalle
- [ ] Imágenes cargan correctamente
- [ ] Información completa visible

### Test 4: SEO

- [ ] Ver source de `/comprar/[slug]`
- [ ] Verificar meta tags
- [ ] Verificar Open Graph
- [ ] Verificar que el contenido está en HTML (no solo JS)

---

## 📊 MONITOREO CONTINUO

### Semana 1: Verificación diaria

- [ ] Día 1: Verificar que cron ejecutó (check logs 2-3 AM)
- [ ] Día 2: Verificar nuevas propiedades sincronizadas
- [ ] Día 3: Verificar tabla `sync_logs`
- [ ] Día 7: Revisar performance general

### Mensual

- [ ] Revisar logs de errores
- [ ] Verificar espacio en BD
- [ ] Limpiar logs antiguos (>90 días)
- [ ] Actualizar dependencias

---

## 🚨 ROLLBACK PLAN

Si algo falla después del deploy:

### 1. Rollback inmediato

- [ ] Ir a Vercel Dashboard > Deployments
- [ ] Encontrar deployment anterior estable
- [ ] Clic en "..." > "Promote to Production"

### 2. Restaurar datos demo (temporal)

- [ ] Reactivar propiedades demo:
  ```sql
  UPDATE properties 
  SET status = 'active' 
  WHERE source = 'demo';
  ```

### 3. Investigar problema

- [ ] Revisar logs de error
- [ ] Verificar variables de entorno
- [ ] Probar en local
- [ ] Fix + re-deploy

---

## ✅ CHECKLIST FINAL

- [ ] Sitio desplegado en Vercel
- [ ] Base de datos conectada
- [ ] Variables de entorno configuradas
- [ ] Primera sincronización exitosa
- [ ] Propiedades visibles en frontend
- [ ] Cron job configurado y visible
- [ ] Logs sin errores
- [ ] README actualizado
- [ ] Credenciales guardadas de forma segura
- [ ] Cliente informado del cambio

---

## 📞 CONTACTOS ÚTILES

- **Vercel Support:** https://vercel.com/support
- **Idealista Tools:** [soporte de Idealista]
- **Documentación Drizzle:** https://orm.drizzle.team
- **Documentación Vercel Cron:** https://vercel.com/docs/cron-jobs

---

**Estado:** ⬜ No iniciado | 🟡 En progreso | ✅ Completado | ❌ Error

**Fecha de despliegue:** __________

**Desplegado por:** __________

**Notas adicionales:**

_______________________________________________
_______________________________________________
_______________________________________________
