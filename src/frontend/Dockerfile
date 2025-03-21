FROM node:18-alpine AS build
WORKDIR /app

COPY . .
RUN npm install && npm run build

FROM nginx:latest AS release
COPY nginx.conf.template /etc/nginx/conf.d/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html