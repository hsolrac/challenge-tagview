# Use official Node.js image as the base image
FROM node:latest AS build

# Set working directory
WORKDIR /tag-client

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use lightweight Node.js image as the base image for serving the app
FROM node:alpine AS serve

# Set working directory
WORKDIR /tag-client

# Copy build output from previous stage
COPY --from=build /tag-client/build ./build

# Install serve to serve static content
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "build"]
