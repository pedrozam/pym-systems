FROM node:20-bullseye as builder

WORKDIR /app
COPY ./app-pym/package*.json ./
RUN npm install
COPY ./app-pym .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/spa /usr/share/nginx/html
ADD ./nginx/frontend.conf /etc/nginx/conf.d/
