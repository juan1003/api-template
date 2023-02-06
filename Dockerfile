FROM node:16.19.0-alpine

RUN apk add bash

RUN mkdir /app

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . ./

CMD ["yarn", "dev"]
