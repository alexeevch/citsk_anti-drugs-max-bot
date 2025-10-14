#!/bin/bash
set -e

echo "🚀 Starting anti-drugs bot production deployment..."

# Создаем директорию для логов если её нет
mkdir -p /app/logs

# Ждем подключения к базе данных
echo "⏳ Waiting for database connection..."
npx prisma db push --accept-data-loss

# Запускаем миграции Prisma
echo "📦 Running Prisma migrations..."
npx prisma migrate deploy

# Запускаем сидинг базы данных
echo "🌱 Running database seeding..."
npm run prisma:seed

echo "✅ Database setup completed!"

# Запускаем приложение через PM2
echo "🎯 Starting application with PM2..."
exec pm2-runtime ecosystem.config.cjs
