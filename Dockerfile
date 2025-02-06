FROM node:12.13.0

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first for caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Manually create the RAM disk directory (avoid needing sudo)
RUN mkdir -p /mnt/wpr

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]