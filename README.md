# MAX BOT (Бот приема обращений)

Бот обратной связи для приема сообщений о фактах незаконного оборота подконтрольных веществ, нанесении наркоспама на
объекты городской инфраструктуры, работе Интернет-площадок по продаже наркотиков.

### Запуск в режиме разработки

- `cp docker-compose.override.dev.example.yml docker-compose.override.dev.yml`
- `make build-dev`
- `make up-dev`

### Запуск в режиме продакшена

- `cp docker-compose.override.prod.example.yml docker-compose.override.prod.yml`
- `make build-prod`
- `make up-prod`
