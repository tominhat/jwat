FROM node:20-alpine AS builder
WORKDIR /app
COPY . /app/
RUN npm install
EXPOSE 3000

CMD ["node", "server.js"] 