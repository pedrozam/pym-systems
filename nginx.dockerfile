FROM node:20-bullseye as builder

WORKDIR /app

# 1. Copiar solo archivos de configuración
COPY ./app-pym/package*.json ./
COPY ./app-pym/quasar.config.js ./
COPY ./app-pym/quasar.extensions.json ./

# 2. Instalar dependencias (aprovecha caché si no cambian)
RUN npm install

# 3. Copiar el código fuente
COPY ./app-pym .

# 4. Construir
RUN npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/spa /usr/share/nginx/html
ADD ./nginx/frontend.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]