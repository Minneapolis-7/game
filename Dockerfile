FROM node:14-alpine AS build
WORKDIR /app
COPY . .
RUN npm install -f && npm run build

FROM node:14-alpine
COPY --from=build /app/dist /dist
CMD node ./dist/server.js
