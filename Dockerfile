FROM node:14-alpine AS build
WORKDIR /app
COPY . .
RUN npm install -f && npm run build

FROM node:14-alpine
COPY --from=build /app/dist /dist
COPY --from=build /app/node_modules /node_modules
COPY --from=build /app/start-server.js /start-server.js
CMD node start-server.js
