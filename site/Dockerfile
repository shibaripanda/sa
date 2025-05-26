# Stage 1
FROM node AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG NEXT_PUBLIC_LINK_DEMO_APP
ARG NEXT_PUBLIC_LINK

COPY . .
RUN npm run build

# Stage 2
FROM node AS production

WORKDIR /app

# COPY --from=build /app/node_modules /app/node_modules
# COPY --from=build /app/.next .

COPY --from=build /app/.next .next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/next.config.ts ./

EXPOSE 3000

CMD ["npm", "start"]