# Build Stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -force

COPY . .
RUN npm run build

# Production Stage
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist .
EXPOSE 5050
CMD ["node", "main.js"]