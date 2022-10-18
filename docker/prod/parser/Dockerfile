FROM node:16-alpine AS runner

RUN apk add --no-cache libc6-compat git

WORKDIR /app

ENV NODE_ENV production

COPY servers/parser ./servers/parser

RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile
RUN yarn build

CMD ["yarn", "start"]
