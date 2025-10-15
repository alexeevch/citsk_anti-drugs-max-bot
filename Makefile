.PHONY: help
.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build-dev: ## Сборка главного образа
	docker build -f docker/dev.Dockerfile -t max-bot:dev .

up-dev: ## Запуск локального окружения
	docker compose -f docker-compose.yml -f docker-compose.override.dev.yml up -d

down-dev: ## Остановка локального окружения
	docker compose -f docker-compose.yml -f docker-compose.override.dev.yml down

status-dev: ## Статус контейнеров
	docker compose -f docker-compose.yml -f docker-compose.override.dev.yml ps

restart-dev: ## Перезапуск локального окружения
	docker compose -f docker-compose.yml -f docker-compose.override.dev.yml restart

cli-dev: ## Подключение к консоли php-fpm контейнера
	docker compose -f docker-compose.yml -f docker-compose.override.dev.yml exec bot bash

logs-dev: ## Просмотр логов
	docker compose -f docker-compose.yml -f docker-compose.override.dev.yml logs -f



build-prod: ## Сборка главного образа
	docker compose -f docker-compose.yml -f docker-compose.override.prod.yml build --no-cache

up-prod: ## Запуск локального окружения
	docker compose -f docker-compose.yml -f docker-compose.override.prod.yml up -d

down-prod: ## Остановка локального окружения
	docker compose -f docker-compose.yml -f docker-compose.override.prod.yml down

status-prod: ## Статус контейнеров
	docker compose -f docker-compose.yml -f docker-compose.override.prod.yml ps

restart-prod: ## Перезапуск локального окружения
	docker compose -f docker-compose.yml -f docker-compose.override.prod.yml restart

cli-prod: ## Подключение к консоли php-fpm контейнера
	docker compose -f docker-compose.yml -f docker-compose.override.prod.yml exec bot bash

logs-prod: ## Просмотр логов
	docker compose -f docker-compose.yml -f docker-compose.override.prod.yml logs -f
