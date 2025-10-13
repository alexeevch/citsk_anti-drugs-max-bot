.PHONY: help
.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build-dev: ## Сборка главного образа
	docker build -f docker/dev.Dockerfile -t max-bot:dev .

build-prod: ## Сборка главного образа prod
	docker build -f docker/prod.Dockerfile -t max-bot:prod .

up: ## Запуск локального окружения
	docker compose -f docker-compose.yml -f docker-compose.override.yml up -d

down: ## Остановка локального окружения
	docker compose -f docker-compose.yml -f docker-compose.override.yml down

status: ## Статус контейнеров
	docker compose -f docker-compose.yml -f docker-compose.override.yml ps

restart: ## Перезапуск локального окружения
	docker compose -f docker-compose.yml -f docker-compose.override.yml restart

cli: ## Подключение к консоли php-fpm контейнера
	docker compose -f docker-compose.yml -f docker-compose.override.yml exec bot bash

logs: ## Просмотр логов
	docker compose -f docker-compose.yml -f docker-compose.override.yml logs -f
