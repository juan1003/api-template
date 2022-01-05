FROM node:current-alpine3.10

RUN apk add bash

RUN mkdir /app

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["nodemon", "index.js"]
