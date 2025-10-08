FROM node:24-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY app/package*.json ./
COPY app/prisma ./prisma/

RUN npm ci
RUN npx prisma generate

CMD ["npm", "run", "dev"]
