FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY ./ /usr/src/app

RUN npm run build

FROM nginx:alpine

# COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/billing-app/browser /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
