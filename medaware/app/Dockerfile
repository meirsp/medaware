FROM node:14

WORKDIR /app

COPY /app/src/package.json .

RUN npm install

COPY /app/src .

EXPOSE 3000

CMD [ "npm", "start" ]