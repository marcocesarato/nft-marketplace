THIS_FILE := $(MAKEFILE_LIST)
PROJECT_NAME=nft-marketplace

# Environment
include .env

ifndef ENV
$(error The ENV variable is missing.)
endif

ifeq ($(filter $(ENV),dev prod),)
$(error The ENV variable is invalid.)
endif

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

.DEFAULT_GOAL := help
.PHONY: help build up start down stop restart logs ps mongo shell pull push login

# Helper
help: ## Show available commands
	@echo ""
	@echo $(ECHO_FLAGS) "Usage: $(Color_Yellow)make [target]$(Color_Off)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(THIS_FILE) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(Color_Cyan)%-15s$(Color_Off) %s\n", $$1, $$2}'
	@echo ""
	@echo $(ECHO_FLAGS) "Current environment: $(Color_Cyan)$(ENV)$(Color_Off)"
	@echo ""
	@echo $(ECHO_FLAGS) "You can force the $(Color_Yellow)ENV$(Color_Off) variable inline or change it on $(Color_Green).env$(Color_Off) file"
	@echo $(ECHO_FLAGS) "Inline example: $(Color_Yellow)make ENV=prod [target]$(Color_Off)"
	@echo ""

# Targets
build: ## Builds docker image/s
	$(info Building "$(ENV)" docker image/s)
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) build $(c)
start: ## Starts and build if needed docker container/s on background
	$(info Starting "$(ENV)" docker container/s)
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) up -d $(c)
stop: ## Stops and removes docker container/s
	$(info Stopping "$(ENV)" docker container/s)
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) down $(c)
restart: stop start ## Restarts docker container/s
logs: ## Prints out the last logs of the docker container/s
	$(info Printing out the last logs of the "$(ENV)" docker container/s)
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) logs --tail=100 -f $(c)
ps: ## Prints out the status of the docker containers
	$(info Printing out the status of the "$(ENV)" docker containers)
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) ps
mongo: ## Opens a mongo shell in the database container
	$(info Opens a mongo shell in the database "$(ENV)" container)
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) exec -T mongo mongosh
shell: ## Opens a shell in the app container
	$(info Opens a shell in the "$(ENV)" app container)
	docker-compose --project-name $(PROJECT_NAME)_$(ENV) -f $(COMPOSE_FILE) exec -T app sh
clean: ## Removes all docker images
	$(info Removing all "$(ENV)" docker images)
	docker system prune -a
login: ## Login to docker registry
	$(info Login to Docker Hub.)
	@docker login -u $(DOCKER_USER) -p $(DOCKER_PASS)
push: ## Push docker container/s to registry
	$(info Pushing "$(TAG)" tagged image.)
	@docker push $(DOCKER_APP_IMAGE):$(DOCKER_TAG)
	@docker push $(DOCKER_INDEXER_IMAGE):$(DOCKER_TAG)
pull: ## Pull docker container/s from registry
	$(info Pulling "$(TAG)" tagged image.)
	@docker pull $(DOCKER_APP_IMAGE):$(DOCKER_TAG)
	@docker pull $(DOCKER_INDEXER_IMAGE):$(DOCKER_TAG)
