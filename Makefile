.PHONY: help build-dev build-prod up-dev up-prod down-dev down-prod logs-dev logs-prod clean restart-dev restart-prod

# Default target
help:
	@echo "Technology Radar Docker Commands:"
	@echo ""
	@echo "Development Commands:"
	@echo "  build-dev     - Build development Docker image"
	@echo "  up-dev        - Start development environment with hot reload"
	@echo "  down-dev      - Stop development environment"
	@echo "  restart-dev   - Restart development environment"
	@echo "  logs-dev      - View development logs"
	@echo ""
	@echo "Production Commands:"
	@echo "  build-prod    - Build production Docker image"
	@echo "  up-prod       - Start production environment"
	@echo "  down-prod     - Stop production environment"
	@echo "  restart-prod  - Restart production environment"
	@echo "  logs-prod     - View production logs"
	@echo ""
	@echo "Utility Commands:"
	@echo "  clean         - Remove all containers, images, and volumes"
	@echo "  help          - Show this help message"

# Development commands
build-dev:
	docker-compose build app-dev

up-dev:
	docker-compose up -d app-dev nginx-dev
	@echo "Development environment started!"
	@echo "React App: http://localhost:3000"
	@echo "Nginx Proxy: http://localhost:8080"

down-dev:
	docker-compose down app-dev nginx-dev

restart-dev:
	docker-compose restart app-dev nginx-dev

logs-dev:
	docker-compose logs -f app-dev nginx-dev

# Production commands
build-prod:
	docker-compose -f docker-compose.prod.yml build

up-prod:
	docker-compose -f docker-compose.prod.yml up -d
	@echo "Production environment started!"
	@echo "App: http://localhost:80"

down-prod:
	docker-compose -f docker-compose.prod.yml down

restart-prod:
	docker-compose -f docker-compose.prod.yml restart

logs-prod:
	docker-compose -f docker-compose.prod.yml logs -f

# Utility commands
clean:
	docker-compose down -v --rmi all
	docker-compose -f docker-compose.prod.yml down -v --rmi all
	docker system prune -f
	docker volume prune -f
	@echo "All containers, images, and volumes removed!"

# Quick start for development
dev: build-dev up-dev
	@echo "Development environment ready!"
	@echo "React App: http://localhost:3000"
	@echo "Nginx Proxy: http://localhost:8080"
	@echo "Use 'make logs-dev' to view logs"

# Quick start for production
prod: build-prod up-prod
	@echo "Production environment ready!"
	@echo "App: http://localhost:80"
	@echo "Use 'make logs-prod' to view logs"
