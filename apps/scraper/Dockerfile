# Imagen base Playwright con Node.js
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Configuración básica
ENV HOST=0.0.0.0 \
    PORT=3000 \
    NODE_ENV=production

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY apps/scraper/dist .

# Instala solo deps de producción
RUN pnpm install --prod
RUN pnpm add tslib playwright

# Instalar navegadores necesarios para Playwright
RUN npx playwright install chromium  --with-deps

USER pwuser

EXPOSE ${PORT}

# Ejecutar el archivo ya compilado
CMD ["node", "main.js"]
