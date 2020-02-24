FROM node:6.11.5

RUN mkdir /app
WORKDIR /app

RUN yarn add express@4.16.2

COPY src/obc.js /app/src/

EXPOSE 4000

CMD ["node", "src/obc.js"]
