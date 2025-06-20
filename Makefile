THIS_FILE := $(MAKEFILE_LIST)
PROJECT_NAME=nft-marketplace

# Environment
include .env

ifndef NODE_ENV
$(error The NODE_ENV variable is missing.)
endif

ifeq ($(NODE_ENV), production)
COMPOSE_FILE = "$(CURDIR)/docker-compose.yml"
else ifeq ($(NODE_ENV), development)
COMPOSE_FILE = "$(CURDIR)/docker-compose.dev.yml"
else
COMPOSE_FILE = "$(CURDIR)/docker-compose.$(NODE_ENV).yml"
endif

ENV_FILE = "$(CURDIR)/.env"

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

RUN_ARGS = $(filter-out $@, $(MAKECMDGOALS))

# Helper
help: ## Show available commands
	@echo ""
	@echo $(ECHO_FLAGS) "Usage: $(Color_Yellow)make [target] [options]$(Color_Off)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(THIS_FILE) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(Color_Cyan)%-15s$(Color_Off) %s\n", $$1, $$2}'
	@echo ""
	@echo $(ECHO_FLAGS) "Current environment: $(Color_Cyan)$(NODE_ENV)$(Color_Off)"
	@echo $(ECHO_FLAGS) "You can force the $(Color_Yellow)NODE_ENV$(Color_Off) variable inline or change it on $(Color_Green).env$(Color_Off) file"
	@echo $(ECHO_FLAGS) "  Example: $(Color_Yellow)make NODE_ENV=prod [target] [options]$(Color_Off)"
	@echo ""

# Targets
build: ## Builds docker image/s
	$(info Building "$(NODE_ENV)" docker image/s)
	docker-compose --project-name $(PROJECT_NAME)_$(NODE_ENV) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) build $(RUN_ARGS)
start: ## Starts and build if needed docker container/s on background
	$(info Starting "$(NODE_ENV)" docker container/s)
	docker-compose --project-name $(PROJECT_NAME)_$(NODE_ENV) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) up -d
stop: ## Stops and removes docker container/s
	$(info Stopping "$(NODE_ENV)" docker container/s)
	docker-compose --project-name $(PROJECT_NAME)_$(NODE_ENV) -f $(COMPOSE_FILE) down
restart: stop start ## Restarts docker container/s
logs: ## Prints out the last logs of the docker container/s
	$(info Printing out the last logs of the "$(NODE_ENV)" docker container/s)
	docker-compose --project-name $(PROJECT_NAME)_$(NODE_ENV) -f $(COMPOSE_FILE) logs --tail=100 -f $(RUN_ARGS)
ps: ## Prints out the status of the docker containers
	$(info Printing out the status of the "$(NODE_ENV)" docker containers)
	docker-compose --project-name $(PROJECT_NAME)_$(NODE_ENV) -f $(COMPOSE_FILE) ps
mongo: ## Opens a mongo shell in the database container
	$(info Opens a mongo shell in the database "$(NODE_ENV)" container)
	docker-compose --project-name $(PROJECT_NAME)_$(NODE_ENV) -f $(COMPOSE_FILE) exec -T mongo mongosh -u "$(MONGODB_ROOT_USERNAME)" -p "$(MONGODB_ROOT_PASSWORD)"
shell: ## Opens a shell in the app container
	$(info Opens a shell in the "$(NODE_ENV)" app container)
	docker-compose --project-name $(PROJECT_NAME)_$(NODE_ENV) -f $(COMPOSE_FILE) exec -T app sh
clean: ## Removes all docker images
	$(info Removing all "$(NODE_ENV)" docker images)
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
%:
	@true
