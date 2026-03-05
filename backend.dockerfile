FROM node:20-buster-slim

WORKDIR /app
COPY ./backend-pym/package*.json ./
RUN npm install
COPY ./backend-pym .

CMD ["node","src/index.js"]
