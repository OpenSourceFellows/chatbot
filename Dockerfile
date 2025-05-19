# Use official Node.js image
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm ci

# Copy source files
COPY . .

# Build the app (if needed)
# RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]