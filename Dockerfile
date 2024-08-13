# Stage 1: Build the React application
FROM node:18 AS build

# Set the working directory for the frontend
WORKDIR /app/client

# Copy the React application package.json and package-lock.json
COPY client/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the React application code
COPY client ./

# Build the React application
RUN npm run build

# Stage 2: Setup the Node.js backend
FROM node:18

# Set the working directory for the backend
WORKDIR /app

# Copy the backend package.json and package-lock.json
COPY server/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend application code
COPY server ./

# Copy the built frontend code from the build stage
COPY --from=build /app/client/build /app/client/build

# Expose the port the backend runs on
EXPOSE 8080

# Install concurrently to manage running both apps
RUN npm install -g concurrently

# Start both backend and frontend
CMD ["concurrently", "\"node server.js\"", "\"cd client && npm install && npm run start\""]
