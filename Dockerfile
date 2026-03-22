# Base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy app source
COPY . .

# Expose port
EXPOSE 8084

# Start the server
CMD ["npm", "start"]