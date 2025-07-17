FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY apps/mailer/dist ./

# Instala solo deps de producción
RUN pnpm install --prod
RUN pnpm add tslib

# Expone el puerto que usa la app mailer (ajusta si usas otro)
EXPOSE 3000

USER node

# Ejecuta la app con Node.js
CMD ["node", "main.js"]
