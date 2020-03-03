# https://github.com/kenji4569/typescript-node-docker
# Base
FROM node:13.7.0-alpine3.11 as base
# ALERT: 上記 alpine3.11 は yarn が古いので sha.js の実行ファイルチェックに失敗する
RUN mkdir -p /usr/src/app
ENV APP_ROOT=/usr/src/app
WORKDIR ${APP_ROOT}

# Pre-Builder
FROM base AS prebuilder
COPY package.json package.json
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
    mkdir /tmp/app && \
    mv node_modules /tmp/app && \
    mv package.json /tmp/app && \
    mv config /tmp/app && \
    mv templates /tmp/app && \
    mv dist /tmp/app

# Release
FROM base AS release
ENV NODE_ENV=production
COPY --from=builder /tmp/app /usr/src/app
CMD ["yarn", "start"]
