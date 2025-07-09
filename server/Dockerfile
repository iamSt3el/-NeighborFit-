FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create a startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "Waiting for MongoDB to be ready..."' >> /app/start.sh && \
    echo 'sleep 10' >> /app/start.sh && \
    echo 'echo "Running data seeder..."' >> /app/start.sh && \
    echo 'node utils/dataSeeder.js' >> /app/start.sh && \
    echo 'echo "Starting server..."' >> /app/start.sh && \
    echo 'npm start' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 5000

CMD ["/app/start.sh"]
