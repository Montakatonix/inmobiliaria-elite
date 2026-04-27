# Inmobiliaria Élite - Sincronización Automática Idealista

Sistema automatizado de sincronización de propiedades desde Idealista hacia la web de Inmobiliaria Élite.

## 🚀 Características

- ✅ Sincronización automática diaria desde Idealista
- ✅ Descarga XML vía FTP oficial
- ✅ Base de datos PostgreSQL (Vercel Postgres)
- ✅ Cron job diario (2 AM UTC)
- ✅ Endpoint de sincronización manual seguro
- ✅ Logs persistentes de sincronización
- ✅ Manejo robusto de errores
- ✅ SEO-friendly slugs
- ✅ Imágenes optimizadas desde CDN Idealista

## 📋 Requisitos Previos

- Node.js 18+
- Cuenta en Vercel
- Base de datos Vercel Postgres
- Credenciales FTP de Idealista/tools

## 🔧 Configuración Inicial

### 1. Clonar repositorio

```bash
git clone https://github.com/Montakatonix/inmobiliaria-elite.git
cd inmobiliaria-elite
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.local.example` a `.env.local`:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` y configura todas las variables necesarias.

### 4. Crear tablas en base de datos

```bash
npm run db:push
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

## 📦 Despliegue en Vercel

Ver documentación completa en el archivo para los pasos de despliegue.

## 🔄 Sincronización

El sistema se sincroniza automáticamente cada día a las 2:00 AM UTC.

También puedes ejecutar sincronización manual mediante el endpoint API.

---

**Versión**: 1.0.0  
**Última actualización**: Abril 2024
