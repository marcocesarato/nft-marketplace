FROM node:16-alpine AS runner

RUN apk add --no-cache libc6-compat git

WORKDIR /app

COPY package.json yarn.lock ./
COPY indexer ./

RUN yarn cache clean
RUN yarn install --frozen-lockfile

CMD ["yarn", "process:indexer"]
