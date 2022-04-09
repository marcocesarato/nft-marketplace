THIS_FILE := $(MAKEFILE_LIST)

# Environments
include .env
ENV?=dev
PROJECT_NAME=nft-marketplace

ifeq ($(ENV), prod)
	COMPOSE_FILE = docker-compose.yml
else
    COMPOSE_FILE = docker-compose.$(ENV).yml
endif

# Colors
Color_Off=\033[0m
Color_Green=\033[32m
Color_Yellow=\033[33m
Color_Cyan=\033[36m

# Windows need a flag to evaluate colors
ifeq ($(OS),Windows_NT)
	ECHO_FLAGS=-e
endif

@echo "Current Environment: $(ENV)"

.DEFAULT_GOAL := help
.PHONY: help build up start down stop restart logs ps mongo shell

# Helper
help: ## Show available commands
	@echo ""
	@echo $(ECHO_FLAGS) "Usage: $(Color_Yellow)make [target]$(Color_Off)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(THIS_FILE) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(Color_Cyan)%-15s$(Color_Off) %s\n", $$1, $$2}'
	@echo ""
	@echo $(ECHO_FLAGS) "Current environment: $(Color_Cyan)$(ENV)$(Color_Off)"
	@echo ""
	@echo $(ECHO_FLAGS) "You can force the env inline or chaning it on $(Color_Green).env$(Color_Off) file $(Color_Cyan)(default dev)$(Color_Off)"
	@echo $(ECHO_FLAGS) "Inline example: $(Color_Yellow)make ENV=prod [target]$(Color_Off)"
	@echo ""

# Targets
build: ## Builds docker container/s
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) build $(c)
start: ## Starts and build if needed docker container/s on background
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) up -d $(c)
stop: ## Stops and removes docker container/s
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) down $(c)
restart: stop start ## Restarts docker container/s
logs: ## Prints out the last logs of the docker container/s
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) logs --tail=100 -f $(c)
ps: ## Prints out the status of the docker containers
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) ps
mongo: ## Opens a mongo shell in the database container
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) -it mongo mongo
shell: ## Opens a shell in the app container
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) -it app sh
clean: ## Removes all docker container/s
	docker system prune -a
