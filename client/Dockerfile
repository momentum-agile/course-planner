FROM node:14-alpine

ARG DOGGER_HOSTNAME=
ENV REACT_APP_HOSTNAME=${DOGGER_HOSTNAME}

WORKDIR /app
COPY package.json .

RUN yarn
COPY . .

CMD ["yarn", "start"]