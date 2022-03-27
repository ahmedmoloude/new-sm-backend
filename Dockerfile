
FROM node:14.15.4-alpine as production
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm install --save-dev sequelize-cli
EXPOSE 3000
CMD [ "npm", "run", "start" ]
