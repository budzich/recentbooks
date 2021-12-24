FROM node:14.17.4 AS development

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

COPY ./dist ./dist

CMD ["yarn", "run", "start:dev"]

