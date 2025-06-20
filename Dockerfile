FROM node:22-alpine

WORKDIR /app

ENV MONGO_USER=admin

ENV MONGO_USER_PASSWORD=password

COPY package*.json .

RUN npm ci

COPY . .

CMD [ "node", "app.js" ]