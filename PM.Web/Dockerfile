FROM node:14.17.6 as build-step

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

RUN npm run build

FROM nginx
COPY --from=build-step /app/dist/Web usr/share/nginx/html
EXPOSE 80:80