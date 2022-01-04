FROM node:16 AS test

USER node
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN CI=true npm run test

FROM test AS build

ENV REACT_APP_BACKEND_URL=http://localhost:3000

CMD npm start