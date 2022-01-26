FROM node:14.17.6 as build-step

RUN mkdir /app
WORKDIR /app

# restore packages
COPY package.json /app
RUN npm install

COPY . /app

# build app
RUN npm run build

FROM nginx

# copy build artificate to nginx server
COPY --from=build-step /app/dist/Web /data/www/

# copy nginx custom configurations to relevent folders
COPY /nginx/customconfig.conf /etc/nginx/conf.d/customconfig.conf
COPY /nginx/nginx.conf /etc/nginx/nginx.conf

# copy ssl certificate
COPY /nginx/ssl/productmanager.crt /etc/nginx/productmanager.crt
COPY /nginx/ssl/productmanager.key /etc/nginx/productmanager.key

EXPOSE 80
EXPOSE 443