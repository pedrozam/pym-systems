FROM node:20-bullseye as builder

WORKDIR /app

# Copiar TODO el código primero
COPY ./app-pym .

# Ahora instalar dependencias (ya existe el proyecto Quasar completo)
RUN npm install

# Construir la aplicación
RUN npm run build --prod

FROM nginx:alpine

# Copiar el build
COPY --from=builder /app/dist/spa /usr/share/nginx/html

# Configuración de nginx
ADD ./nginx/frontend.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]