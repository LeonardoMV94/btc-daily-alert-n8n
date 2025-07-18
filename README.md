# CryptoAlert 🚀

<div align="center">

![Nx](/flow.png)

**Sistema de Monitoreo y Alertas de Criptomonedas**

[![NestJS](https://img.shields.io/badge/NestJS-11.0.0-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-green.svg)](https://www.docker.com/)
[![Nx](https://img.shields.io/badge/Nx-21.2.3-purple.svg)](https://nx.dev/)

</div>

## 📋 Descripción

CryptoAlert es un sistema completo de monitoreo y alertas para criptomonedas construido con **NestJS** y **Nx**. El proyecto incluye tres microservicios principales que trabajan en conjunto para proporcionar funcionalidades de scraping, notificaciones por email y Telegram.

### 🎯 Características Principales

- **Web Scraping Automatizado**: Extrae datos del índice de miedo y codicia de criptomonedas
- **Sistema de Notificaciones**: Envío de alertas por email y Telegram
- **Arquitectura de Microservicios**: Servicios independientes y escalables
- **Automatización con n8n**: Integración para workflows automatizados
- **Colas de Trabajo**: Procesamiento asíncrono con Redis y BullMQ
- **Containerización**: Despliegue simplificado con Docker Compose

## 🏗️ Arquitectura del Proyecto

```
crypto-alert/
├── apps/
│   ├── mailer/                 # Servicio de envío de emails con Resend y BullMQ
│   ├── telegram/               # Servicio de notificaciones Telegram
│   └── scraper/                # Servicio de web scraping con Playwright
├── docker-compose.yml          # Configuración de contenedores
├── btc-notification-flow.json  # Exportacion de workflow de n8n
└── package.json                # Dependencias del workspace
```

### 🔧 Tecnologías Utilizadas

- **Backend**: NestJS 11, TypeScript 5.8.2
- **Web Scraping**: Playwright 1.54.1
- **Colas de Trabajo**: BullMQ, Redis
- **Email**: Resend API
- **Notificaciones**: Telegram Bot API
- **Orquestación**: Docker Compose
- **Automatización**: n8n
- **Build Tool**: Nx 21.2.3
- **Package Manager**: pnpm

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- Docker y Docker Compose
- pnpm (recomendado) o npm

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd crypto-alert
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Resend API (para emails)
RESEND_API_KEY=your_resend_api_key_here

# Telegram Bot Token
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# Redis Configuration (opcional, valores por defecto)
REDIS_HOST=redis
REDIS_PORT=6379

# Playwright Configuration
PLAYWRIGHT_HEADLESS=true
```

### 4. Ejecutar con Docker Compose

```bash
docker-compose up -d
```

Esto iniciará todos los servicios:
- **Mailer**: http://localhost:3000
- **Telegram**: http://localhost:3001  
- **Scraper**: http://localhost:3002
- **n8n**: http://localhost:5678
- **Redis**: localhost:6379

### 5. Desarrollo Local

Para desarrollo individual de cada servicio:

```bash
# Servicio de emails
pnpm nx serve mailer

# Servicio de Telegram
pnpm nx serve telegram

# Servicio de scraping
pnpm nx serve scraper
```

## 📚 Documentación de APIs

### 🔍 Scraper Service

**Endpoint**: `GET http://localhost:3002/api/scraper`

Extrae datos del índice de miedo y codicia de criptomonedas desde [alternative.me](https://alternative.me/crypto/fear-and-greed-index/).

#### Respuesta

```json
{
  "Now": 70,
  "Yesterday": 73,
  "Last week": 66,
  "Last month": 61,
  "image": "https://alternative.me/crypto/fear-and-greed-index.png"
}
```

#### Ejemplo de Uso

```bash
curl http://localhost:3002/api/scraper
```

### 📧 Mailer Service

**Endpoint**: `POST http://localhost:3000/api/mailer/send`

Envía emails utilizando la API de Resend.

#### Request Body

```json
{
  "from": "contact@your-domain.com",
  "to": ["example@gmail.com"],
  "subject": "Alerta de Criptomonedas",
  "html": "<h1>Índice de Miedo y Codicia</h1><p>El valor actual es: 70</p>"
}
```

#### Respuesta

```json
{
  "id": "text-uuid"
}
```

#### Ejemplo de Uso

```bash
curl -X POST http://localhost:3000/api/mailer/send \
  -H "Content-Type: application/json" \
  -d '{
    "from": "contact@your-domain.com",
    "to": ["example@gmail.com"],
    "subject": "Test",
    "html": "test de n8n"
  }'
```

### 💬 Telegram Service

**Endpoint**: `POST http://localhost:3001/api/telegram/send-message`

Envía mensajes a través de un bot de Telegram.

#### Request Body

```json
{
  "chatId": "123456789",
  "text": "¡Alerta! El índice de miedo y codicia es: 70"
}
```

#### Respuesta

```json
{
  "ok": true,
  "result": {
    "message_id": 123,
    "from": {...},
    "chat": {...},
    "date": 1234567890,
    "text": "¡Alerta! El índice de miedo y codicia es: 70"
  }
}
```

#### Ejemplo de Uso

```bash
curl -X POST http://localhost:3001/api/telegram/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "123123",
    "text": "hi iam automated message"
  }'
```

## 🔄 Automatización con n8n

El proyecto incluye **n8n** para automatizar workflows. Accede a la interfaz web en:

```
http://localhost:5678
```

### Workflows Recomendados

1. **Monitoreo Periódico**: Configurar un trigger cada hora para obtener datos del scraper
2. **Alertas Automáticas**: Enviar notificaciones cuando el índice supere ciertos umbrales
3. **Reportes Diarios**: Generar reportes automáticos por email

## 🛠️ Comandos Útiles

### Desarrollo

```bash
# Ejecutar todos los tests
pnpm nx run-many -t test

# Linting
pnpm nx run-many -t lint

# Build de todos los proyectos
pnpm nx run-many -t build

# Ver gráfico de dependencias
pnpm nx graph
```

### Docker

```bash
# Construir imágenes individuales
pnpm nx docker-build mailer
pnpm nx docker-build telegram
pnpm nx docker-build scraper

# Ver logs de un servicio específico
docker compose logs -f scraper

# Reiniciar un servicio
docker compose restart mailer
```

### CI/CD

El proyecto incluye configuración de GitHub Actions para CI/CD automático.

## 📊 Monitoreo y Logs

### Logs de Contenedores

```bash
# Todos los servicios
docker compose logs

# Servicio específico
docker compose logs scraper

# Seguir logs en tiempo real
docker compose logs -f
```

### Health Checks

- **Scraper**: `GET http://localhost:3002/api/scraper`
- **Mailer**: `GET http://localhost:3000/health` (si implementado)
- **Telegram**: `GET http://localhost:3001/health` (si implementado)

## 🔧 Configuración Avanzada

### Variables de Entorno Adicionales

```env
# Configuración de Playwright
PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=false

# Configuración de n8n
N8N_BASIC_AUTH_ACTIVE=false
N8N_PROTOCOL=http
N8N_HOST=0.0.0.0
N8N_PORT=5678

# Configuración de Redis
REDIS_PASSWORD=your_redis_password
```

### Personalización de Docker

Cada servicio tiene su propio `Dockerfile` que puedes modificar según tus necesidades:

- `apps/mailer/Dockerfile`
- `apps/telegram/Dockerfile`  
- `apps/scraper/Dockerfile`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa los [issues existentes](https://github.com/your-repo/crypto-alert/issues)
2. Crea un nuevo issue con detalles del problema
3. Contacta al equipo de desarrollo

---

<div align="center">

**CryptoAlert** - Sistema de Monitoreo y Alertas de Criptomonedas

Construido con ❤️ usando NestJS, Nx y Docker

</div>