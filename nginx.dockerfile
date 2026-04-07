FROM node:20-bullseye as builder

WORKDIR /app
# Copiar archivos de configuración ANTES de npm install (quasar prepare los necesita)
COPY ./app-pym/package*.json ./
COPY ./app-pym/quasar.conf.js ./
COPY ./app-pym/.quasarrc ./
COPY ./app-pym/index.html ./
RUN npm install
# Ahora copiar el resto
COPY ./app-pym .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/spa /usr/share/nginx/html
ADD ./nginx/frontend.conf /etc/nginx/conf.d/
