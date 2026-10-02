FROM node:20-alpine
WORKDIR /backend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node dist/main.js"]