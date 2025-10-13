# ─── Build stage ───
FROM node:24-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY app/package*.json ./
COPY app/prisma ./prisma/
RUN npm ci

COPY app ./
RUN npx prisma generate
RUN npm run build

# ─── Runtime stage ───
FROM node:24-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pm2

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

COPY docker/ecosystem.config.cjs ./ecosystem.config.cjs

ENV NODE_ENV=production

CMD ["pm2-runtime", "ecosystem.config.cjs"]
