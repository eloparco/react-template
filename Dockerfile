FROM node:14.15.4-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --silent
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html