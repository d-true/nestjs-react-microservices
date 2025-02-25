FROM node:22-alpine as build

WORKDIR /app
COPY . ./

RUN npm install
RUN npm run docker

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=build app/dist /usr/share/nginx/html

COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

RUN mkdir -p /usr/share/nginx/html/uploads

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]