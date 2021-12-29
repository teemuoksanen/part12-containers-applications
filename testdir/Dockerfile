FROM node:16

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=testdir:*

CMD npm start
