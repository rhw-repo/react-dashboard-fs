FROM node:24-alpine AS builder
WORKDIR /usr/src/app
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN chown node:node /usr/src/app
USER node
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY --chown=node:node . .
RUN pnpm run build

FROM nginxinc/nginx-unprivileged:1.29.4-alpine3.23

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/dist /var/www

EXPOSE 8080