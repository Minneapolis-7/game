FROM node:14-alpine AS build
WORKDIR /app
COPY . .
RUN npm install -f && npm run build

FROM node:14-alpine
COPY --from=build /app/dist /dist
COPY --from=build /app/node_modules /node_modules
COPY --from=build /app/start-server.js /start-server.js
COPY --from=build /app/.env /.env
# todo: `npm i dotenv` после того, как `node_modules` будут удалены: https://github.com/Minneapolis-7/game/issues/111
CMD node -r dotenv/config start-server.js
