# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Install Quasar CLI globally
RUN npm install -g @quasar/cli

# Clone the project repository
RUN git clone https://github.com/kevreth/SpoonFeeder.git .

# Install project dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 9000

# Command to run the Quasar development server
CMD ["quasar", "dev"]

