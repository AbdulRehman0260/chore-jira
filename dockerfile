FROM node:20-alpine

WORKDIR /app

# Install backend deps only
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Install and build frontend
COPY frontend/package*.json ./frontend/
COPY frontend/ ./frontend/
RUN cd frontend && npm ci && npm run build

# Copy source code
COPY backend/ ./backend/

# Set production env
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "backend/index.js"]