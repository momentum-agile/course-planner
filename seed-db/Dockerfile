FROM node:10-alpine as generator

WORKDIR /data

COPY . .

RUN yarn
RUN node ./scripts/index.js --amount 10

FROM mongo:latest

COPY . .
COPY --from=generator ./data/ .
RUN ["chmod", "+x", "init.sh"]
CMD ["./init.sh"]