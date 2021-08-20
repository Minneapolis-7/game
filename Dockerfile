FROM ubuntu:21.04
FROM node:14
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Moscow
COPY dist ./dist/
COPY server-dist ./server-dist/
EXPOSE 3000
CMD node ./server-dist/index.js
