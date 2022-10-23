FROM node:16-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /main
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=indexer --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk update
WORKDIR /main

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /main/out/json/ .
COPY --from=builder /main/out/yarn.lock ./yarn.lock
RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile

# Build the project
COPY --from=builder /main/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=indexer...

FROM node:alpine AS runner
WORKDIR /main

# Production environment
ENV NODE_ENV production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 serverjs
USER serverjs

COPY --from=installer /main/servers/indexer/package.json .

CMD ["yarn", "start"]
