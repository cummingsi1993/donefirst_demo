
FROM node:16 AS build-env
WORKDIR /usr/app

COPY . .

RUN npm install 
RUN npm run build 

FROM ubuntu

COPY --from=build-env /usr/app/build/. /var/www/html

RUN apt-get update
RUN apt-get install nginx -y
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
 