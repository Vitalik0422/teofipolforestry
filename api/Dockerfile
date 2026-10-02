FROM node:22-alpine
WORKDIR /backend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
EXPOSE 3000
CMD ["node", "dist/main.js"]