# Multi-stage build for React Todo App
# Stage 1: Build the application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:alpine AS production

# Copy the build output to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional - nginx default config works for SPA)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]