# Stage 1: Build the Vite app
FROM node:24-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginxinc/nginx-unprivileged:1.29.4-alpine3.23

# Copy the nginx configuration file to the appropriate location
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built assets from the builder stage
COPY --from=builder /usr/src/app/dist /var/www

# Expose port 8080 for the application
EXPOSE 8080