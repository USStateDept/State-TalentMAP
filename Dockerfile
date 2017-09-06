FROM node:6.11

RUN mkdir /app
WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn

COPY config /app/config/
COPY public /app/public/
COPY src /app/src/
COPY scripts /app/scripts/
