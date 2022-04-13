FROM node:16.14.2-alpine as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

RUN npm run build

CMD [ "npm", "run", "start" ]
