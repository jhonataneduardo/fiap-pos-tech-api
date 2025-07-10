.PHONY: help build up down restart logs logs-api logs-db shell db-shell clean dev prod migrate seed status rebuild

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Build the Docker images
	docker compose build

up: ## Start all services
	docker compose up -d

down: ## Stop all services
	docker compose down

restart: ## Restart all services
	docker compose restart

logs: ## Show logs for all services
	docker compose logs -f

logs-api: ## Show logs for API service only
	docker compose logs -f fiap-pos-tech-api

logs-db: ## Show logs for database service only
	docker compose logs -f fiap-pos-tech-db

shell: ## Access API container shell
	docker compose exec fiap-pos-tech-api sh

db-shell: ## Access database shell
	docker compose exec fiap-pos-tech-db psql -U fiap_pos_tech_user -d fiap_pos_tech_db

clean: ## Remove all containers, images and volumes
	docker compose down -v --rmi all --remove-orphans
	docker system prune -f

dev: ## Start in development mode
	docker compose --profile dev up -d

prod: ## Start in production mode
	docker compose up -d fiap-pos-tech-api

migrate: ## Run database migrations
	docker compose exec fiap-pos-tech-api npx prisma migrate deploy --schema prisma/schema

seed: ## Seed the database (if you have seed scripts)
	docker compose exec fiap-pos-tech-api npx prisma db seed

status: ## Show status of all services
	docker compose ps

rebuild: ## Rebuild and restart all services
	docker compose down
	docker compose build --no-cache
	docker compose up -d