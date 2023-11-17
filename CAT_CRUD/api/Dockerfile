FROM node:18.14.2
WORKDIR /api
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 3000 
CMD ["sh", "-c", "sleep 10 && npx sequelize db:migrate && (npm test || true) && node server.js"]