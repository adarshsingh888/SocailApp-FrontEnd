# Step 1: Use official Node.js image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json if available
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the app files
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Serve the built files using a lightweight HTTP server
# Install serve globally to serve the production build
RUN npm install -g serve

# Step 8: Set environment variable (optional)
ENV NODE_ENV=production

# Step 9: Expose port (default for serve is 3000)
EXPOSE 3000

# Step 10: Start the server
CMD ["serve", "-s", "dist", "-l", "80"]
