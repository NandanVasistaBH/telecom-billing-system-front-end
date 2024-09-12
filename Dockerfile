FROM node:16.20.0-alpine

ENV NODE_ENV=DEV

WORKDIR /code

COPY package.json .

RUN npm install

EXPOSE 3002

COPY . .

CMD ["npm","run","start"]