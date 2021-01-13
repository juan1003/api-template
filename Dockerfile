FROM node:current-alpine3.10

RUN mkdir /app

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "index.js"]
