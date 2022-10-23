FROM node:16-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /main
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=app --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk update
WORKDIR /main

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /main/out/json/ .
COPY --from=builder /main/out/yarn.lock ./yarn.lock
RUN yarn install --ignore-scripts --prefer-offline --frozen-lockfile

# Build the project
COPY --from=builder /main/out/full/ .
COPY turbo.json turbo.json

# Next.js collects completely anonymous telemetry data about general usage
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build
RUN npx next telemetry disable
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn turbo run build --filter=app...

FROM node:alpine AS runner
WORKDIR /main

# Disable Next.js telemetry
RUN npx next telemetry disable
ENV NEXT_TELEMETRY_DISABLED 1
# Production environment
ENV NODE_ENV production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Custom server with HTTPS
COPY ./docker/prod/app/server.js app/server.js

COPY --from=installer /main/app/next.config.js .
COPY --from=installer /main/app/next-i18next.config.js ./
COPY --from=installer /main/app/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /main/app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /main/app/.next/static ./main/app/.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "app/server.js"]
