# Build Stage
FROM node AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -force

ARG REACT_APP_LINK
ARG REACT_APP_WS
ARG REACT_APP_BOTLINK

COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]