FROM node:16-alpine AS runner

RUN apk add --no-cache libc6-compat git

WORKDIR /app

ENV NODE_ENV production

# Source code
COPY src/database ./src/database
COPY servers/indexer ./servers/indexer

# Configs
COPY abis ./abis
COPY addresses.js ./

WORKDIR /app/servers/indexer/

RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile
RUN yarn build

CMD ["yarn", "start"]
