FROM node:18-alpine
WORKDIR /app

COPY . .
RUN npm install && npm run build
RUN mkdir data log

CMD node dist/index.js
