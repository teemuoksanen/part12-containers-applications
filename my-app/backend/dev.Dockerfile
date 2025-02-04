FROM node:16
  
WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV DEBUG=phone-backend:*

CMD ["npm", "start"]