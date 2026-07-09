FROM node:22-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN  npm install

COPY  .. /app

RUN npm run  generate-db

EXPOSE 8080

CMD ["npm", "run", "start-backend"]