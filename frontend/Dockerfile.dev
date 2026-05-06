# syntax=docker/dockerfile:1

FROM node:24-alpine

WORKDIR /usr/src/app

# Install additional system dependencies
RUN apk update && apk add --no-cache git

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port for Vite dev server
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host"]
