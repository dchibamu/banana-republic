# Use official Node.js LTS image
FROM node:lts-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for dependency caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Expose app port
EXPOSE 3000

# Start application
CMD ["npm", "run", "start:dev"]