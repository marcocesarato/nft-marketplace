# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat git

WORKDIR /app
COPY app/package.json ./

RUN yarn install --frozen-lockfile

# Development image, copy all the files and run next
FROM node:16-alpine AS runner
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Disable Next.js telemetry
RUN npx next telemetry disable
ENV NEXT_TELEMETRY_DISABLED 1

ENV NODE_ENV development

COPY docker/dev/app/.babelrc ./.babelrc
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "dev"]
