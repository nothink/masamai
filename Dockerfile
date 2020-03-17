# https://github.com/kenji4569/typescript-node-docker
# Base
FROM node:13.10.1-alpine3.11 as base
# ALERT: 上記 alpine3.11 は yarn が古いので sha.js の実行ファイルチェックに失敗する
RUN mkdir -p /app
ENV APP_ROOT=/app
WORKDIR ${APP_ROOT}

# Pre-Builder
FROM base AS prebuilder
COPY package.json package.json
COPY .env .env
RUN yarn install --production=false

# Builder
FROM prebuilder AS builder
COPY . .
COPY --from=prebuilder /app/node_modules /app/node_modules
RUN yarn lint && \
    # yarn test:unit && \
    yarn build && \
    rm -r node_modules yarn.lock && \
    yarn install --production=true && \
    mkdir /atmp && \
    mv node_modules /atmp && \
    mv package.json /atmp && \
    mv .env /atmp && \
    mv config /atmp && \
    mv templates /atmp && \
    mv dist /atmp

# Release
FROM base AS release
ENV NODE_ENV=production
COPY --from=builder /atmp /app
CMD ["yarn", "start"]
