FROM node:24-alpine

ENV NODE_ENV=production

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY apps/telegram/dist ./

# Instala solo deps de producción
RUN pnpm install --prod
RUN pnpm add tslib

# Expone el puerto que usa la app telegram (ajusta si usas otro)
EXPOSE 3000

USER node

# Ejecuta la app con Node.js
CMD ["node", "main.js"]
