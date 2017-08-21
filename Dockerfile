FROM node:6.11

RUN mkdir /app
WORKDIR /app

ADD package.json /app/
RUN yarn
