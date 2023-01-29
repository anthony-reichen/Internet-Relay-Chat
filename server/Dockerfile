FROM node:19-alpine
WORKDIR /app
COPY ./server/package.json .
RUN npm install
WORKDIR /app/server
COPY . .
CMD node app.js