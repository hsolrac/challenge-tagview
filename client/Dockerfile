# Use official Node.js image as the base image
FROM node:latest AS build

# Set working directory
WORKDIR /app-client

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to serve the app
CMD ["npm", "start"]
