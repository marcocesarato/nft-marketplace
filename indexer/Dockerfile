FROM node:16-alpine AS runner

RUN apk add --no-cache libc6-compat git

WORKDIR /app

COPY . .
COPY indexer/package.json ./package.json
COPY indexer/tsconfig.json ./tsconfig.json

RUN yarn install --production --ignore-scripts --prefer-offline

CMD ["yarn", "start"]
