# /frontend/Dockerfile
# syntax=docker/dockerfile:1

# Stage 1: Build the Vite app
FROM node:24-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the built assets from the builder stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Replace Nginx's default config to listen on Railway's $PORT
RUN echo 'server { \
    listen       ${PORT:-80}; \
    server_name  localhost; \
    location / { \
        root   /usr/share/nginx/html; \
        index  index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf.template

# Inject the Railway PORT environment variable into the Nginx config at runtime
CMD envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'