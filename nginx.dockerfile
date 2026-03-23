FROM node:20-bullseye as builder

WORKDIR /app

# Copiar TODO el código primero
COPY ./app-pym .

# Instalar dependencias
RUN npm install

# Construir la aplicación en MODO PWA (no SPA)
RUN npm run build -- -m pwa 

FROM nginx:alpine

# Instalar curl para healthchecks
RUN apk add --no-cache curl

# Copiar el build PWA (cambia la ruta de spa a pwa)
COPY --from=builder /app/dist/pwa /usr/share/nginx/html  

# Copiar configuración de nginx
ADD ./nginx/frontend.conf /etc/nginx/conf.d/default.conf 

# Verificar que los archivos se copiaron correctamente
RUN ls -la /usr/share/nginx/html && \
    test -f /usr/share/nginx/html/index.html || echo "⚠️ index.html no encontrado" && \
    test -f /usr/share/nginx/html/service-worker.js || echo "⚠️ service-worker.js no encontrado"

# Healthcheck para verificar que el service worker está accesible
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/service-worker.js || exit 1

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]