FROM node:16

USER node
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=phone-backend:*

CMD npm start