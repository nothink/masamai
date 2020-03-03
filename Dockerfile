# https://github.com/kenji4569/typescript-node-docker
# Base
FROM node:13.7.0-alpine3.11 as base
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
COPY --from=prebuilder /usr/src/app/node_modules /usr/src/app/node_modules
RUN yarn lint && \
    # yarn test:unit && \
    yarn build && \
    rm -r node_modules yarn.lock && \
    yarn install --production=true && \
    mkdir /tmp && \
    mv node_modules /tmp && \
    mv package.json /tmp && \
    mv .env /tmp && \
    mv config /tmp && \
    mv templates /tmp && \
    mv dist /tmp

# Release
FROM base AS release
ENV NODE_ENV=production
COPY --from=builder /tmp /app
CMD ["yarn", "start"]
