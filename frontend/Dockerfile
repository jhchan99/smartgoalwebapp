# --- Stage 1: Build the React app ---
# Using node:20-alpine for a slightly newer Node.js LTS and smaller base image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the React app for production
# Environment variables will be available from --set-build-env-vars
RUN npm run build

# --- Stage 2: Serve the static files with Nginx ---
# Using nginx:alpine for a lightweight Nginx server
FROM nginx:alpine

# Copy the built React app from the 'builder' stage into Nginx's HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Remove Nginx's default configuration and copy your custom one
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run injects the PORT environment variable.
# Your Nginx configuration must listen on this variable.
# We set a default here (e.g., 8080), but Cloud Run will override it.
ENV PORT 8080
EXPOSE ${PORT}

# Command to run Nginx in the foreground
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp && mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
