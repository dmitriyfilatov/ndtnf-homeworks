FROM node:15-alpine

RUN apk --update --virtual build-deps add \
        bash \
        bash-completion

WORKDIR /app/server

ENTRYPOINT npm run start:dev