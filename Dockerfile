# https://github.com/kenji4569/typescript-node-docker
# Base
FROM node:14.3.0-alpine3.11 as base
RUN mkdir -p /app
ENV APP_ROOT=/app
WORKDIR ${APP_ROOT}

# Pre-Builder
FROM base AS prebuilder
COPY package.json package.json
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
    mkdir /build && \
    mv node_modules /build && \
    mv package.json /build && \
    mv config /build && \
    mv templates /build && \
    mv dist /build

# Release
FROM base AS release
ENV NODE_ENV=production
COPY --from=builder /build /app
CMD ["yarn", "start"]
