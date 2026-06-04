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

# Replace Nginx's default config to listen on strictly ${PORT}
RUN echo 'server { \
    listen       ${PORT}; \
    server_name  localhost; \
    location / { \
        root   /usr/share/nginx/html; \
        index  index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf.template

# Export default PORT if undefined, run envsubst, and start Nginx
CMD export PORT="${PORT:-80}" && envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'