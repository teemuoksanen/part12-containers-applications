FROM node:16 AS base

USER node
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

RUN CI=true npm run test

FROM base AS build

COPY --from=base . .

ENV REACT_APP_BACKEND_URL=/api/

CMD npm run build

FROM nginx:1.20-alpine AS deploy

COPY --from=build /usr/src/app/build /usr/share/nginx/html