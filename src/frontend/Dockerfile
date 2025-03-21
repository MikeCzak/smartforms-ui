FROM node:18-alpine AS base
WORKDIR /app

COPY . .
RUN npm install && npm run build

FROM base AS release
COPY --from=base /app/dist /app/dist
COPY --from=base /app/package.json /app/package.json
CMD npm run start:build
