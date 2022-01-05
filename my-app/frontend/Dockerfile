FROM node:16 AS build-stage

USER node
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

CMD npm run build

FROM nginx:1.20-alpine AS deploy

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html