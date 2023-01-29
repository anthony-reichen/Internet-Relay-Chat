#PRODUCTION

# FROM node:19 as frontNode

# WORKDIR /app
# COPY ./front/package.json .
# COPY ./front/package-lock.json .
# RUN npm install
# COPY ./front .
# RUN ls /app
# RUN npm run build

# FROM nginx:1.19.0-alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=frontNode /app/build /usr/share/nginx/html
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

#DEV

FROM node:19-alpine
WORKDIR /app
COPY ./front/package.json .
RUN npm install
WORKDIR /app/front
COPY . .
CMD npm start