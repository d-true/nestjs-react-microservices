FROM node:22-alpine AS base

FROM base AS build-api-gateway

WORKDIR /app/api-gateway
COPY ./api-gateway ./

RUN npm install
RUN npm run build

FROM base AS build-user-mcs
WORKDIR /app/user-mcs
COPY ./user-mcs ./

RUN npm install
RUN npm run build

FROM base AS build-comment-mcs
WORKDIR /app/comment-mcs
COPY ./comment-mcs ./

RUN npm install
RUN npm run build

FROM base
WORKDIR /app/api-gateway

COPY --from=build-api-gateway /app/api-gateway/dist ./
COPY ./api-gateway/package.json ./package.json

RUN npm install
RUN mkdir -p /var/log/api-gateway

WORKDIR /app/user-mcs

COPY --from=build-user-mcs /app/user-mcs/dist ./
COPY ./user-mcs/.env.db.docker ./.env.db.docker
COPY ./user-mcs/package.json ./package.json

RUN npm install
RUN mkdir -p /var/log/user-mcs

WORKDIR /app/comment-mcs

COPY --from=build-comment-mcs /app/comment-mcs/dist ./
COPY ./comment-mcs/.env.db.docker ./.env.db.docker
COPY ./comment-mcs/package.json ./package.json

RUN npm install
RUN mkdir -p /var/log/comment-mcs

WORKDIR /app

COPY package.json .
COPY .env.docker.api-gateway .
COPY .env.docker.user-mcs .
COPY .env.docker.comment-mcs .
COPY ecosystem.config.js .

RUN npm install

EXPOSE 3000 3010 3011
CMD ["npm", "run", "start"]
