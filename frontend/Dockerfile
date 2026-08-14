FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev", "--", "-p", "5000"]