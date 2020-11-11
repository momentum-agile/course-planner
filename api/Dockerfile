FROM node:14-alpine
WORKDIR /app

COPY ./package.json ./
RUN yarn

COPY ./src ./
CMD ["yarn", "start"]
