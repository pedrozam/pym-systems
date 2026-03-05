FROM node:20-bullseye as builder

WORKDIR /app

# Capa 1: Copiar solo archivos de configuración (cambian poco)
COPY ./app-pym/package*.json ./
COPY ./app-pym/quasar.config.js ./
COPY ./app-pym/index.html ./

# Capa 2: Instalar dependencias (cacheable)
RUN npm install

# Capa 3: Copiar código fuente (cambia frecuentemente)
COPY ./app-pym/src ./src/
COPY ./app-pym/public ./public/


# Capa 4: Construir
RUN npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/spa /usr/share/nginx/html
ADD ./nginx/frontend.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]