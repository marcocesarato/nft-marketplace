THIS_FILE := $(lastword $(MAKEFILE_LIST))

.PHONY: help build up start down stop restart logs ps db-shell

help: ## Show available commands
	@echo ""
	@echo "Usage: make [option]"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""
build: ## Builds docker container/s
	docker-compose -f docker-compose.yml build $(c)
up: ## Starts and build if needed docker container/s on background
	docker-compose -f docker-compose.yml up -d $(c)
down: ## Stops and removes docker container/s
	docker-compose -f docker-compose.yml down $(c)
start: ## Starts docker container/s
	docker-compose -f docker-compose.yml start $(c)
stop: ## Stops docker container/s
	docker-compose -f docker-compose.yml stop $(c)
restart: ## Restarts docker container/s
	docker-compose -f docker-compose.yml stop $(c)
	docker-compose -f docker-compose.yml up -d $(c)
logs: ## Prints out the last logs of the docker container/s
	docker-compose -f docker-compose.yml logs --tail=100 -f $(c)
clean: ## Removes all docker container/s
	docker system prune -a
ps: ## Prints out the status of the docker container/s
	docker-compose -f docker-compose.yml ps
db-shell: ## Opens a shell in the database container
	docker-compose -f docker-compose.yml -it mongo mongo
