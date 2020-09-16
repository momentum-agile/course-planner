FROM node:14-alpine

WORKDIR /app
COPY package.json .

RUN yarn
COPY . .

CMD ["yarn", "start"]