FROM node:current-alpine3.10

RUN apk add bash

RUN mkdir /app

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . ./

CMD ["yarn", "dev"]
