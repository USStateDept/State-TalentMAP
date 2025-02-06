FROM node:12.13.0

# Set working directory
WORKDIR /app

# Install Git
RUN apt-get install git

# Copy package.json and yarn.lock first for caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]