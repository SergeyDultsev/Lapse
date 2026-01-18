FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ../frontend_backup .

EXPOSE 5000

CMD ["npm", "run", "dev"]