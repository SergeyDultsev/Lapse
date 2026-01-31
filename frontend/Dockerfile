FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

EXPOSE 5000

CMD ["npm", "run", "dev", "--", "-p", "5000"]