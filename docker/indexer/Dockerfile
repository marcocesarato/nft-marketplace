FROM node:16-alpine AS runner

RUN apk add --no-cache libc6-compat git

WORKDIR /app

# Source code
COPY src/database ./src/database
COPY indexer ./indexer

# Dependencies
COPY docker/indexer/package.json ./package.json
COPY docker/indexer/yarn.lock ./yarn.lock

# Configs
COPY abis ./abis
COPY addresses.js ./
COPY indexer/tsconfig.json ./tsconfig.json

RUN yarn install --production --ignore-scripts --prefer-offline

CMD ["yarn", "start"]
