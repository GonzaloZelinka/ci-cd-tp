# TypeScript CI/CD Demo - Docker Container
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Copy public files for deployment
COPY public/ ./public/
RUN mkdir -p dist && cp public/index.html dist/

# Expose port (if needed for web server)
EXPOSE 3000

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Change ownership of app directory
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('Health check passed')" || exit 1

# Run the application
CMD ["npm", "start"]

# Labels for better organization
LABEL maintainer="Personal Account Demo"
LABEL description="TypeScript CI/CD Demo Application"
LABEL version="1.0.0" 