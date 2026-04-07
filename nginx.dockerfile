FROM node:20-bullseye AS builder

WORKDIR /app
COPY ./app-pym/package*.json ./
# Cambia esta línea:
RUN npm install --ignore-scripts
COPY ./app-pym .
# Agrega esta línea:
RUN npx quasar prepare
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/spa /usr/share/nginx/html
COPY ./nginx/frontend.conf /etc/nginx/conf.d/