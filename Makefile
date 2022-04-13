help: ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

run-dev: build node_modules ## Run the dev server
	docker run --rm -it -p 8080:8080 -v `pwd`:/app fastify-ts-api npm run dev:server

run-prod: build ## Run the prod server
	docker run --rm -it -p8080:8080 fastify-ts-api

build: ## Build the docker image
	docker build . -t fastify-ts-api

deploy:
	gcloud builds submit

node_modules: ## Internal, run npm install so we have node_modules locally for autocomplete
	docker run --rm --user=$$(id -u):$$(id -g) -p 8080:8080 -v `pwd`:/app fastify-ts-api /bin/sh -c "npm install"