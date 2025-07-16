# Etapa 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia los archivos de dependencias y configuración
COPY package.json pnpm-lock.yaml ./
COPY apps/scraper/package.json ./apps/scraper/
COPY tsconfig.base.json tsconfig.json ./
COPY apps/scraper/tsconfig.* ./apps/scraper/
COPY apps/scraper/webpack.config.js ./apps/scraper/
COPY apps/scraper/src ./apps/scraper/src

# Instala dependencias (solo producción para el build)
RUN pnpm install --frozen-lockfile

# Build del proyecto
RUN npx nx build @crypto-alert/scraper

# Etapa 2: Imagen final Playwright + Node
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

WORKDIR /app

# Copia solo el build y las dependencias necesarias
COPY --from=builder /app/dist/apps/scraper ./dist
COPY --from=builder /app/apps/scraper/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Instala navegadores y dependencias de Playwright
RUN npx playwright install --with-deps

EXPOSE 3000

CMD ["node", "dist/main.js"]
